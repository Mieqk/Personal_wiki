"""
Main CLI entry point for Personal Wiki.
"""

import argparse
import sys
from pathlib import Path

from builder import WikiBuilder
from frontmatter import parse_frontmatter


def safe_join(base: Path, user_path: str) -> Path:
    """Safely join user-provided path to base, preventing traversal."""
    if not user_path:
        return base
    # Reject paths starting with / or containing ..
    if user_path.startswith('/') or '..' in user_path:
        raise ValueError("Path traversal detected")
    target = (base / user_path).resolve()
    if not target.is_relative_to(base.resolve()):
        raise ValueError("Path traversal detected")
    return target


def cmd_build(args: argparse.Namespace) -> int:
    """Handle the build command."""
    source = Path(args.source).resolve()
    output = Path(args.output).resolve()
    
    if not source.exists():
        print(f"Error: Source directory '{source}' does not exist.")
        return 1
    
    builder = WikiBuilder(str(source), str(output))
    builder.build()
    return 0


def cmd_serve(args: argparse.Namespace) -> int:
    """Handle the serve command - build and start a local server."""
    from flask import Flask, send_from_directory, abort, redirect, url_for
    import webbrowser
    import threading
    import time
    
    source = Path(args.source).resolve()
    port = int(args.port)
    watch = getattr(args, 'watch', False)
    
    if not source.exists():
        print(f"Error: Source directory '{source}' does not exist.")
        return 1
    
    # Create a temporary output directory
    output_dir = source.parent / f"{source.name}_output"
    
    # Build the site first
    print("Building site...")
    builder = WikiBuilder(str(source), str(output_dir))
    builder.build()
    
    # Setup Flask app
    app = Flask(__name__, static_folder=str(output_dir))
    
    @app.route('/')
    def index():
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/graph')
    def graph():
        return send_from_directory(app.static_folder, 'graph.html')
    
    @app.route('/search')
    def search():
        return send_from_directory(app.static_folder, 'search.html')
    
    @app.route('/new')
    def new_page():
        return send_from_directory(app.static_folder, 'new.html')
    
    @app.route('/api/save', methods=['POST'])
    def save_page():
        """API endpoint to save a new wiki page."""
        from flask import request, jsonify
        import datetime
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        title = data.get('title', '').strip()
        folder = data.get('folder', '').strip()
        tags_input = data.get('tags', '').strip()
        content = data.get('content', '').strip()
        
        if not title or not content:
            return jsonify({'error': 'Title and content are required'}), 400
        
        # Validate folder path
        try:
            safe_folder = safe_join(source, folder) if folder else source
        except ValueError:
            return jsonify({'error': 'Invalid path'}), 400
        
        # Parse tags
        tags = []
        if tags_input:
            tags = [tag.strip() for tag in tags_input.split(',') if tag.strip()]
        
        # Generate slug from title
        slug = title.lower()
        for char in '-<>[]{}()/\\?@&!#$%*+|=^_~':
            slug = slug.replace(char, '-')
        slug = slug.strip('-')
        
        # Build file path
        notes_dir = source
        if folder:
            folder_path = safe_folder
            folder_path.mkdir(parents=True, exist_ok=True)
            file_path = folder_path / f"{slug}.md"
        else:
            file_path = notes_dir / f"{slug}.md"
        
        # Build frontmatter
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        frontmatter = f"""---
title: {title}
created: {today}
"""
        
        if tags:
            frontmatter += f"tags: [{', '.join(tags)}]\n"
        
        frontmatter += "---\n\n"
        
        # Full markdown content
        markdown_content = frontmatter + content
        
        try:
            file_path.write_text(markdown_content, encoding='utf-8')
            
            # Rebuild the site to include the new page
            output_dir = source.parent / f"{source.name}_output"
            builder = WikiBuilder(str(source), str(output_dir))
            builder.build()
            
            return jsonify({
                'success': True,
                'message': 'Page created successfully',
                'slug': slug,
                'folder': folder if folder else '',
                'path': str(file_path)
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/update', methods=['POST'])
    def update_page():
        """API endpoint to update an existing wiki page."""
        from flask import request, jsonify
        import datetime
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        original_slug = data.get('originalSlug', '').strip()
        title = data.get('title', '').strip()
        folder = data.get('folder', '').strip()
        tags_input = data.get('tags', '').strip()
        content = data.get('content', '').strip()
        
        if not original_slug or not title or not content:
            return jsonify({'error': 'Original slug, title and content are required'}), 400
        
        # Validate original_slug and folder paths
        if original_slug.startswith('/') or '..' in original_slug:
            return jsonify({'error': 'Invalid path'}), 400
        try:
            safe_folder = safe_join(source, folder) if folder else source
        except ValueError:
            return jsonify({'error': 'Invalid path'}), 400
        
        # Parse tags
        tags = []
        if tags_input:
            tags = [tag.strip() for tag in tags_input.split(',') if tag.strip()]
        
        # Generate new slug from title
        new_slug = title.lower()
        for char in '-<>[]{}()/\\?@&!#$%*+|=^_~':
            new_slug = new_slug.replace(char, '-')
        new_slug = new_slug.strip('-')
        
        # Find the original file
        notes_dir = source
        original_file = notes_dir / f"{original_slug}.md"
        
        # Also check in subdirectories
        if not original_file.exists():
            for md_file in notes_dir.rglob(f"{original_slug}.md"):
                original_file = md_file
                break
        
        if not original_file.exists():
            return jsonify({'error': 'Original file not found'}), 404
        
        # Determine new file path
        if folder:
            folder_path = safe_folder
            folder_path.mkdir(parents=True, exist_ok=True)
            new_file_path = folder_path / f"{new_slug}.md"
        else:
            new_file_path = notes_dir / f"{new_slug}.md"
        
        # Get original created date to preserve it
        original_content = original_file.read_text(encoding='utf-8')
        original_frontmatter, _ = parse_frontmatter(original_content)
        original_created = original_frontmatter.get('created', datetime.datetime.now().strftime('%Y-%m-%d'))
        
        # Build frontmatter with preserved created date
        frontmatter = f"""---
title: {title}
created: {original_created}
"""
        
        if tags:
            frontmatter += f"tags: [{', '.join(tags)}]\n"
        
        frontmatter += "---\n\n"
        
        # Full markdown content
        markdown_content = frontmatter + content
        
        try:
            # Write to new location
            new_file_path.write_text(markdown_content, encoding='utf-8')
            
            # If slug changed or folder changed, delete old file
            if new_file_path != original_file:
                original_file.unlink()
            
            # Rebuild the site to include the updated page
            output_dir = source.parent / f"{source.name}_output"
            builder = WikiBuilder(str(source), str(output_dir))
            builder.build()
            
            return jsonify({
                'success': True,
                'message': 'Page updated successfully',
                'slug': new_slug,
                'path': str(new_file_path)
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/delete', methods=['POST'])
    def delete_page():
        """API endpoint to delete a wiki page."""
        from flask import request, jsonify
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        slug = data.get('slug', '').strip()
        
        if not slug:
            return jsonify({'error': 'Slug is required'}), 400
        
        # Validate slug
        if slug.startswith('/') or '..' in slug:
            return jsonify({'error': 'Invalid path'}), 400
        
        # Find the file to delete
        file_path = source / f"{slug}.md"
        
        # Also check in subdirectories
        if not file_path.exists():
            for md_file in source.rglob(f"{slug}.md"):
                file_path = md_file
                break
        
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        try:
            file_path.unlink()
            
            # Rebuild the site
            output_dir = source.parent / f"{source.name}_output"
            builder = WikiBuilder(str(source), str(output_dir))
            builder.build()
            
            return jsonify({
                'success': True,
                'message': 'Page deleted successfully',
                'slug': slug
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/<path:path>')
    def serve_file(path):
        # Check if it's a direct HTML file request
        if path.endswith('.html'):
            try:
                return send_from_directory(app.static_folder, path)
            except Exception:
                abort(404)
        
        # Try to find the .html file
        try:
            return send_from_directory(app.static_folder, path + '.html')
        except Exception:
            pass
        
        # Try in subdirectories
        try:
            return send_from_directory(app.static_folder, path)
        except Exception:
            abort(404)
    
    # Open browser after a short delay
    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f'http://localhost:{port}')
    
    print(f"\nStarting server at http://localhost:{port}")
    print("Press Ctrl+C to stop")
    
    threading.Thread(target=open_browser, daemon=True).start()
    
    if watch:
        try:
            from watchdog.observers import Observer
            from watchdog.events import FileSystemEventHandler
            
            class RebuildHandler(FileSystemEventHandler):
                def __init__(self, source_dir: Path, output_dir: Path):
                    self.source_dir = source_dir
                    self.output_dir = output_dir
                    self._rebuild_timer = None
                
                def on_modified(self, event):
                    if event.is_directory or not event.src_path.endswith('.md'):
                        return
                    
                    # Debounce rebuilds
                    if self._rebuild_timer is not None:
                        self._rebuild_timer.cancel()
                    
                    def do_rebuild():
                        print("\nDetected changes, rebuilding...")
                        builder = WikiBuilder(str(self.source_dir), str(self.output_dir))
                        builder.build()
                        print("Rebuild complete.")
                        self._rebuild_timer = None
                    
                    self._rebuild_timer = threading.Timer(0.7, do_rebuild)
                    self._rebuild_timer.start()
            
            observer = Observer()
            handler = RebuildHandler(source, output_dir)
            observer.schedule(handler, str(source), recursive=True)
            observer.start()
            print("Watch mode enabled - will rebuild on .md file changes")
        except ImportError:
            print("Warning: watchdog not installed. Install with: pip install watchdog")
    
    try:
        app.run(host='127.0.0.1', port=port, debug=False)
    except KeyboardInterrupt:
        print("\nServer stopped.")
        if watch:
            observer.stop()
            observer.join()
    
    return 0


def main() -> int:
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description='Personal Wiki - Turn your Markdown files into a local wiki website.',
        prog='personal-wiki'
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # Build command
    build_parser = subparsers.add_parser('build', help='Build static site from Markdown files')
    build_parser.add_argument(
        '--source', '-s',
        default='notes',
        help='Source directory with Markdown files (default: notes)'
    )
    build_parser.add_argument(
        '--output', '-o',
        default='output',
        help='Output directory for generated HTML (default: output)'
    )
    build_parser.set_defaults(func=cmd_build)
    
    # Serve command
    serve_parser = subparsers.add_parser('serve', help='Build and serve site locally')
    serve_parser.add_argument(
        '--source', '-s',
        default='notes',
        help='Source directory with Markdown files (default: notes)'
    )
    serve_parser.add_argument(
        '--port', '-p',
        default='8000',
        help='Port to serve on (default: 8000)'
    )
    serve_parser.add_argument(
        '--watch',
        action='store_true',
        help='Watch source directory for changes and rebuild automatically'
    )
    serve_parser.set_defaults(func=cmd_serve)
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    return args.func(args)


if __name__ == '__main__':
    sys.exit(main())
