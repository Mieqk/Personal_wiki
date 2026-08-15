---
title: Welcome to Personal Wiki
tags: [welcome, getting-started]
created: 2026-08-16
---

# Welcome to Your Personal Wiki! 🎉

This is your new **local knowledge base** built with Python and Markdown.

## Features

- ✅ **Markdown support** - Write in familiar Markdown syntax
- 🔗 **Wiki links** - Use `[[Page Name]]` to link between notes
- 🏷️ **Tags** - Organize content with YAML frontmatter tags
- 📁 **Folder navigation** - Automatic navigation from folder structure
- 🌐 **Static site generation** - Fast, offline-first wiki

## Getting Started

1. Add your Markdown files to the `notes/` folder
2. Run `python main.py build --source notes/ --output output/`
3. Open `output/index.html` in your browser

Or use the serve command:

```bash
python main.py serve --source notes/ --port 8000
```

## Wiki Links

Try linking to other pages like [[Project Ideas]] or [[Daily Note 2026-08-16]].

If a page doesn't exist yet, the link will be marked as broken (like [[Nonexistent Page]]).

## Code Example

Here's a Python code block:

```python
def hello_world():
    print("Hello from Personal Wiki!")
    
hello_world()
```

## Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Markdown parsing | ✅ Done | High |
| Wiki links | ✅ Done | High |
| Search | 🔜 Coming | Medium |
| Graph view | 🔜 Coming | Medium |

## Checkboxes

- [x] Create wiki builder
- [x] Add Markdown parsing
- [ ] Implement search
- [ ] Add graph visualization

---

Happy note-taking! 📝
