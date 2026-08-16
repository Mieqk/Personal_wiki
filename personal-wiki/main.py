"""
Main CLI entry point for Personal Wiki.
"""

import argparse
import sys
from pathlib import Path

from builder import WikiBuilder


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
    
    source = Path(args.source).resolve()
    port = int(args.port)
    
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
            folder_path = notes_dir / folder
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
                'path': str(file_path)
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
                'message': 'Page deleted successfully'
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/<path:path>')
    def serve_file(path):
        # Check if it's a direct HTML file request
        if path.endswith('.html'):
            try:
                return send_from_directory(app.static_folder, path)
            except:
                abort(404)
        
        # Try to find the .html file
        try:
            return send_from_directory(app.static_folder, path + '.html')
        except:
            pass
        
        # Try in subdirectories
        try:
            return send_from_directory(app.static_folder, path)
        except:
            abort(404)
    
    # Open browser after a short delay
    def open_browser():
        import time
        time.sleep(1.5)
        webbrowser.open(f'http://localhost:{port}')
    
    print(f"\nStarting server at http://localhost:{port}")
    print("Press Ctrl+C to stop")
    
    threading.Thread(target=open_browser, daemon=True).start()
    
    try:
        app.run(host='0.0.0.0', port=port, debug=False)
    except KeyboardInterrupt:
        print("\nServer stopped.")
    
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
    build_parser.add_argument(
        '--incremental', '-i',
        action='store_true',
        help='Incremental build (only rebuild changed files) - not yet implemented'
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
    serve_parser.set_defaults(func=cmd_serve)
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return 1
    
    return args.func(args)


if __name__ == '__main__':
    sys.exit(main())
