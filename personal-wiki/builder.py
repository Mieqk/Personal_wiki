"""
Builder module for parsing Markdown and generating HTML pages.
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field

import markdown
from jinja2 import Environment, FileSystemLoader

from frontmatter import parse_frontmatter, get_title, get_tags, get_created


@dataclass
class WikiPage:
    """Represents a single wiki page."""
    filepath: str
    slug: str
    title: str
    content_html: str
    tags: List[str] = field(default_factory=list)
    created: Optional[str] = None
    links: List[str] = field(default_factory=list)  # Wiki links found in content
    folder_path: str = ""  # Relative folder path for navigation


@dataclass
class FolderNode:
    """Represents a folder in the navigation structure."""
    name: str
    path: str
    children: List['FolderNode'] = field(default_factory=list)
    pages: List[WikiPage] = field(default_factory=list)


class WikiBuilder:
    """Builds static wiki site from Markdown files."""
    
    def __init__(self, source_dir: str, output_dir: str):
        """
        Initialize the wiki builder.
        
        Args:
            source_dir: Path to source directory with Markdown files.
            output_dir: Path to output directory for generated HTML.
        """
        self.source_dir = Path(source_dir).resolve()
        self.output_dir = Path(output_dir).resolve()
        self.pages: Dict[str, WikiPage] = {}  # slug -> WikiPage
        self.folder_tree: FolderNode = FolderNode(name="root", path="")
        
        # Setup Jinja2 environment
        template_dir = Path(__file__).parent / "templates"
        self.jinja_env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=True
        )
        
        # Setup Markdown parser with extensions
        self.md_parser = markdown.Markdown(
            extensions=[
                'tables',
                'fenced_code',
                'toc',
                'nl2br',
                'sane_lists',
            ]
        )
    
    def scan_files(self) -> List[Path]:
        """
        Recursively scan source directory for Markdown files.
        
        Returns:
            List of paths to .md files.
        """
        md_files = list(self.source_dir.rglob("*.md"))
        return sorted(md_files)
    
    def file_to_slug(self, filepath: Path) -> str:
        """
        Convert a file path to a URL slug.
        
        Args:
            filepath: Path to the Markdown file.
            
        Returns:
            URL-friendly slug.
        """
        rel_path = filepath.relative_to(self.source_dir)
        # Remove .md extension and convert to URL-safe string
        parts = list(rel_path.parts[:-1]) + [rel_path.stem]
        return "/".join(parts)
    
    def get_folder_path(self, filepath: Path) -> str:
        """
        Get the folder path relative to source directory.
        
        Args:
            filepath: Path to the Markdown file.
            
        Returns:
            Relative folder path or empty string if in root.
        """
        rel_path = filepath.relative_to(self.source_dir)
        if len(rel_path.parts) > 1:
            return "/".join(rel_path.parts[:-1])
        return ""
    
    def extract_wiki_links(self, content: str) -> List[str]:
        """
        Extract wiki-style [[link]] references from content.
        
        Args:
            content: Raw Markdown content.
            
        Returns:
            List of linked page titles/names.
        """
        pattern = r'\[\[([^\]]+)\]\]'
        matches = re.findall(pattern, content)
        return matches
    
    def process_wiki_links(self, html: str, page_slugs: set[str]) -> str:
        """
        Process wiki-style links in HTML content.
        
        Args:
            html: HTML content with potential wiki links.
            page_slugs: Set of available page slugs.
            
        Returns:
            HTML with wiki links converted to proper anchors.
        """
        def replace_link(match: re.Match) -> str:
            link_content = match.group(1)
            
            # Handle alias syntax [[Page Title|alias]] or [[Page Title|Custom Text]]
            if '|' in link_content:
                parts = link_content.split('|', 1)
                link_target = parts[0].strip()
                link_text = parts[1].strip()
            else:
                link_target = link_content
                link_text = link_content
            
            # Try to find matching page by title or slug
            target_slug = None
            
            # Check if any page title matches
            for slug, page in self.pages.items():
                if page.title.lower() == link_target.lower():
                    target_slug = slug
                    break
            
            # Also check by slug directly
            if not target_slug:
                test_slug = link_target.lower().replace(' ', '-')
                if test_slug in page_slugs:
                    target_slug = test_slug
            
            if target_slug:
                return f'<a href="{target_slug}.html" class="wiki-link">{link_text}</a>'
            else:
                return f'<a href="#" class="broken-link" title="Page not found: {link_text}">{link_text}</a>'
        
        pattern = r'\[\[([^\]]+)\]\]'
        return re.sub(pattern, replace_link, html)
    
    def parse_file(self, filepath: Path) -> Optional[WikiPage]:
        """
        Parse a single Markdown file into a WikiPage.
        
        Args:
            filepath: Path to the Markdown file.
            
        Returns:
            WikiPage object or None if parsing failed.
        """
        try:
            content = filepath.read_text(encoding='utf-8')
        except Exception as e:
            print(f"Error reading file {filepath}: {e}")
            return None
        
        # Parse frontmatter
        frontmatter, body = parse_frontmatter(content)
        
        # Extract metadata
        title = get_title(frontmatter, str(filepath))
        tags = get_tags(frontmatter)
        created = get_created(frontmatter)
        
        # Extract wiki links before rendering
        wiki_links = self.extract_wiki_links(body)
        
        # Convert Markdown to HTML
        self.md_parser.reset()
        html_content = self.md_parser.convert(body)
        
        slug = self.file_to_slug(filepath)
        folder_path = self.get_folder_path(filepath)
        
        return WikiPage(
            filepath=str(filepath),
            slug=slug,
            title=title,
            content_html=html_content,
            tags=tags,
            created=created,
            links=wiki_links,
            folder_path=folder_path
        )
    
    def build_folder_tree(self) -> None:
        """Build hierarchical folder navigation structure."""
        def add_to_tree(node: FolderNode, parts: List[str], page: WikiPage) -> None:
            if not parts:
                node.pages.append(page)
                return
            
            current = parts[0]
            remaining = parts[1:]
            
            # Find or create child node
            child_node = None
            for child in node.children:
                if child.name == current:
                    child_node = child
                    break
            
            if not child_node:
                child_path = f"{node.path}/{current}" if node.path else current
                child_node = FolderNode(name=current, path=child_path)
                node.children.append(child_node)
            
            add_to_tree(child_node, remaining, page)
        
        # Reset tree
        self.folder_tree = FolderNode(name="root", path="")
        
        # Add each page to the tree
        for page in self.pages.values():
            if page.folder_path:
                parts = page.folder_path.split("/")
            else:
                parts = []
            add_to_tree(self.folder_tree, parts, page)
    
    def render_page(self, page: WikiPage, all_pages: List[WikiPage]) -> str:
        """
        Render a single page to HTML.
        
        Args:
            page: The WikiPage to render.
            all_pages: List of all pages for navigation.
            
        Returns:
            Rendered HTML string.
        """
        template = self.jinja_env.get_template("page.html")
        
        # Build navigation data
        nav_items = self._build_nav_data()
        
        return template.render(
            page=page,
            all_pages=all_pages,
            nav_items=nav_items,
            folder_tree=self.folder_tree
        )
    
    def render_index(self, all_pages: List[WikiPage]) -> str:
        """
        Render the main index page.
        
        Args:
            all_pages: List of all pages.
            
        Returns:
            Rendered HTML string.
        """
        template = self.jinja_env.get_template("index.html")
        nav_items = self._build_nav_data()
        
        # Find the index/home page if it exists
        index_page = None
        for page in all_pages:
            if page.slug == "index":
                index_page = page
                break
        
        return template.render(
            all_pages=all_pages,
            nav_items=nav_items,
            folder_tree=self.folder_tree,
            index_page=index_page,
            current_page='index'
        )
    
    def render_graph(self, all_pages: List[WikiPage]) -> str:
        """
        Render the graph visualization page.
        
        Args:
            all_pages: List of all pages.
            
        Returns:
            Rendered HTML string.
        """
        template = self.jinja_env.get_template("graph.html")
        nav_items = self._build_nav_data()
        
        # Build graph data
        nodes = []
        links = []
        slug_to_node = {}
        
        # Create nodes for all pages
        for page in all_pages:
            node_id = page.slug
            nodes.append({
                'id': node_id,
                'title': page.title
            })
            slug_to_node[node_id] = page
        
        # Create links from wiki connections
        for page in all_pages:
            source_slug = page.slug
            for link_title in page.links:
                # Try to find target page by title
                target_slug = None
                for slug, p in slug_to_node.items():
                    if p.title.lower() == link_title.lower():
                        target_slug = slug
                        break
                
                if not target_slug:
                    # Try by slug directly
                    test_slug = link_title.lower().replace(' ', '-')
                    if test_slug in slug_to_node:
                        target_slug = test_slug
                
                if target_slug and target_slug != source_slug:
                    links.append({
                        'source': source_slug,
                        'target': target_slug
                    })
        
        return template.render(
            all_pages=all_pages,
            nav_items=nav_items,
            folder_tree=self.folder_tree,
            graph_nodes_json=nodes,
            graph_links_json=links,
            current_page='graph'
        )
    
    def render_search(self, all_pages: List[WikiPage]) -> str:
        """
        Render the search page.
        
        Args:
            all_pages: List of all pages.
            
        Returns:
            Rendered HTML string.
        """
        template = self.jinja_env.get_template("search.html")
        nav_items = self._build_nav_data()
        
        # Build search data
        search_data = []
        for page in all_pages:
            # Strip HTML tags from content for search
            import re
            clean_content = re.sub(r'<[^>]+>', '', page.content_html)
            search_data.append({
                'slug': page.slug,
                'title': page.title,
                'content': clean_content[:500],  # Limit content length
                'tags': page.tags
            })
        
        return template.render(
            all_pages=all_pages,
            nav_items=nav_items,
            folder_tree=self.folder_tree,
            search_data_json=search_data,
            current_page='search'
        )
    
    def render_new(self, all_pages: List[WikiPage]) -> str:
        """
        Render the new page creation page.
        
        Args:
            all_pages: List of all pages.
            
        Returns:
            Rendered HTML string.
        """
        template = self.jinja_env.get_template("new.html")
        nav_items = self._build_nav_data()
        
        return template.render(
            all_pages=all_pages,
            nav_items=nav_items,
            folder_tree=self.folder_tree,
            current_page='new'
        )
    
    def _build_nav_data(self) -> List[Dict[str, Any]]:
        """Build navigation data for templates."""
        nav_items = []
        for page in sorted(self.pages.values(), key=lambda p: p.title):
            nav_items.append({
                'title': page.title,
                'slug': page.slug,
                'folder_path': page.folder_path
            })
        return nav_items
    
    def build(self) -> None:
        """
        Build the entire static site.
        """
        print(f"Scanning {self.source_dir} for Markdown files...")
        
        # Scan and parse all files
        md_files = self.scan_files()
        for filepath in md_files:
            print(f"Processing: {filepath}")
            page = self.parse_file(filepath)
            if page:
                self.pages[page.slug] = page
        
        # Process wiki links (need all pages first)
        page_slugs = set(self.pages.keys())
        for page in self.pages.values():
            page.content_html = self.process_wiki_links(page.content_html, page_slugs)
        
        # Build folder navigation tree
        self.build_folder_tree()
        
        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Render and write each page
        all_pages = list(self.pages.values())
        for page in self.pages.values():
            html = self.render_page(page, all_pages)
            output_path = self.output_dir / f"{page.slug}.html"
            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(html, encoding='utf-8')
            print(f"Generated: {output_path}")
        
        # Generate index page
        index_html = self.render_index(all_pages)
        index_path = self.output_dir / "index.html"
        index_path.write_text(index_html, encoding='utf-8')
        print(f"Generated: {index_path}")
        
        # Generate graph page
        graph_html = self.render_graph(all_pages)
        graph_path = self.output_dir / "graph.html"
        graph_path.write_text(graph_html, encoding='utf-8')
        print(f"Generated: {graph_path}")
        
        # Generate search page
        search_html = self.render_search(all_pages)
        search_path = self.output_dir / "search.html"
        search_path.write_text(search_html, encoding='utf-8')
        print(f"Generated: {search_path}")
        
        # Generate new page
        new_html = self.render_new(all_pages)
        new_path = self.output_dir / "new.html"
        new_path.write_text(new_html, encoding='utf-8')
        print(f"Generated: {new_path}")
        
        # Copy static files
        static_dir = Path(__file__).parent / "static"
        if static_dir.exists():
            output_static = self.output_dir / "static"
            output_static.mkdir(exist_ok=True)
            for static_file in static_dir.iterdir():
                if static_file.is_file():
                    dest = output_static / static_file.name
                    dest.write_bytes(static_file.read_bytes())
            print(f"Copied static files to: {output_static}")
        
        print(f"\nBuild complete! Generated {len(self.pages)} pages.")
