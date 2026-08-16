"""
Frontmatter module for parsing YAML frontmatter from Markdown files.
"""

import os
import re
from typing import Optional, Dict, Any
import yaml


def parse_frontmatter(content: str) -> tuple[Optional[Dict[str, Any]], str]:
    """
    Parse YAML frontmatter from a Markdown file content.
    
    Args:
        content: The full content of the Markdown file.
        
    Returns:
        A tuple of (frontmatter_dict, body_content).
        If no frontmatter is found, returns (None, content).
    """
    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        return None, content
    
    yaml_content = match.group(1)
    body_content = content[match.end():]
    
    try:
        frontmatter = yaml.safe_load(yaml_content)
        return frontmatter, body_content
    except yaml.YAMLError as e:
        print(f"Warning: Failed to parse YAML frontmatter: {e}")
        return None, content


def get_title(frontmatter: Optional[Dict[str, Any]], filepath: str) -> str:
    """
    Extract title from frontmatter or derive from filepath.
    
    Args:
        frontmatter: Parsed frontmatter dictionary.
        filepath: Path to the Markdown file.
        
    Returns:
        The title string.
    """
    if frontmatter and 'title' in frontmatter:
        return str(frontmatter['title'])
    
    # Derive title from filename
    filename = os.path.basename(filepath)
    name_without_ext = os.path.splitext(filename)[0]
    # Convert kebab-case or snake_case to title case
    title = name_without_ext.replace('-', ' ').replace('_', ' ')
    return title.title()


def get_tags(frontmatter: Optional[Dict[str, Any]]) -> list[str]:
    """
    Extract tags from frontmatter.
    
    Args:
        frontmatter: Parsed frontmatter dictionary.
        
    Returns:
        List of tag strings.
    """
    if not frontmatter or 'tags' not in frontmatter:
        return []
    
    tags = frontmatter['tags']
    if isinstance(tags, str):
        return [tags]
    elif isinstance(tags, list):
        return [str(tag) for tag in tags]
    return []


def get_created(frontmatter: Optional[Dict[str, Any]]) -> Optional[str]:
    """
    Extract created date from frontmatter.
    
    Args:
        frontmatter: Parsed frontmatter dictionary.
        
    Returns:
        Created date string or None.
    """
    if frontmatter and 'created' in frontmatter:
        return str(frontmatter['created'])
    return None
