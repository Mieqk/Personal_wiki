# 🧠 Personal Wiki — Your Local Knowledge Base

> **A powerful, fast, and fully offline alternative to Obsidian/Notion built with Python.**  
> Transforms a folder of Markdown files into a beautiful, interactive website with knowledge graphs, search, and in-browser editing.
>
> **Release v1.0** - Stable version with core features: wiki-links, full-text search, interactive graph, dark mode, and browser-based editing.

---

## ✨ Features

- 🔗 **Wiki-Links** — Connect notes using `[[Obsidian-style links]]`
- 🔍 **Instant Search** — Full-text search across all notes powered by SQLite FTS5
- 🕸️ **Knowledge Graph** — Visualize connections between ideas with an interactive D3.js graph
- ✏️ **In-Browser Editing** — Edit pages directly on the site; changes save to original `.md` files
- 🏷️ **Tags & Metadata** — Organize content via YAML frontmatter
- 🌙 **Dark Mode Out-of-the-Box** — Minimalist design that's easy on the eyes
- ⚡ **Static Generation** — Lightning-fast page loads, no database required for deployment
- 📁 **Flexible Structure** — Supports nested folders of any depth
- 🚀 **Local Server** — Start with a single command and work in your browser
- 🌐 **English by Default** — Interface is in English automatically; language switching works consistently across the entire app

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd personal-wiki

# Install dependencies
pip install -r requirements.txt
```

**Requirements:** Python 3.11+ and pip

### 2. Create Your First Notes

The `notes/` folder already contains examples. Add your own `.md` files:

```markdown
---
title: My Ideas
tags: [projects, ideas]
created: 2026-08-16
---

# Hello, World!

This is my first note. Here's a link to [[Another Note]].

- [x] Create wiki
- [ ] Add more notes
- [ ] Build knowledge graph

```python
print("Your code could be here")
```
```

### 3. Start the Server

```bash
python main.py serve --source notes/ --port 8000
```

Open in your browser: **http://localhost:8000** 🎉

---

## 📖 CLI Commands

### 🔨 Build Site

```bash
python main.py build --source notes/ --output output/
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--source` | Folder with `.md` files | `notes/` |
| `--output` | Output folder for the built site | `output/` |
| `--incremental` | Build only changed files | ❌ |

### 🌐 Start Local Server

```bash
python main.py serve --source notes/ --port 8000
```

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--source` | Folder with `.md` files | `notes/` |
| `--port` | Server port | `8000` |

The server automatically builds the site on startup and serves it via the built-in HTTP server.

### ❓ Help

```bash
python main.py --help
python main.py build --help
python main.py serve --help
```

---

## 📝 Note Syntax

### Wiki-Links

Connect notes together:

```markdown
[[Note Title]]                    # Simple link
[[Another Note|Custom Text]]      # Link with custom text
```

- ✅ Existing notes are highlighted in green
- ❌ Non-existent notes are highlighted in red (clicking creates a new page)

### YAML Frontmatter

Metadata at the beginning of the file:

```yaml
---
title: Page Title
tags: [python, wiki, projects]
created: 2026-08-16
updated: 2026-08-17
---
```

| Field | Description |
|-------|-------------|
| `title` | Page title (defaults to filename if missing) |
| `tags` | Tags for categorization |
| `created` | Creation date |
| `updated` | Last modified date |

### Markdown

**Full standard Markdown** is supported:

- Headings `#`, `##`, `###`
- Lists (bulleted, numbered, checkboxes `- [x]`)
- Tables
- Code blocks with syntax highlighting
- Images `![alt](path/to/image.png)`
- Quotes, **bold**, *italic*, ~~strikethrough~~ text

---

## 🔍 Search

- Indexes **titles**, **content**, and **tags** of all notes
- Instant results with highlighted matches
- Works efficiently even with large knowledge bases (1000+ notes)

---

## 🕸️ Knowledge Graph

The `/graph.html` page displays an interactive map of your knowledge:

- 🔵 **Nodes** — Notes
- 🔗 **Lines** — Wiki-links between them
- 🖱️ **Click** — Navigate to note
- 🔍 **Mouse wheel** — Zoom
- ✋ **Drag** — Pan around the graph

---

## ✏️ Page Editing

**A key feature of this wiki!** You can edit notes directly in your browser:

1. Open any page
2. Click the **"Edit"** button (pencil icon)
3. Make changes in the editor
4. Click **"Save"** — changes are written back to the original `.md` file

> ⚠️ Editing requires the server to be running via `python main.py serve` (not just opening static files).

---

## 📁 Project Structure

```
personal-wiki/
├── main.py              # CLI interface (start, build)
├── builder.py           # HTML generation from Markdown
├── frontmatter.py       # YAML frontmatter parser
├── templates/           # HTML templates (Jinja2)
│   ├── base.html        # Base template
│   ├── page.html        # Note page
│   ├── index.html       # Homepage
│   ├── search.html      # Search page
│   ├── graph.html       # Knowledge graph
│   └── edit.html        # Page editor
├── static/              # Static assets
│   ├── style.css        # Styles (dark theme)
│   └── app.js           # Search, graph, editing logic
├── notes/               # Your notes (source)
│   ├── index.md
│   ├── project-ideas.md
│   └── daily/
│       └── 2026-08-16.md
├── notes_output/        # Generated site (for serve)
├── output/              # Generated site (for build)
└── requirements.txt     # Python dependencies
```

---

## 🗂️ Example Note Organization

### 📅 Daily Notes

```
notes/
└── daily/
    ├── 2026-08-16.md
    ├── 2026-08-17.md
    └── 2026-08-18.md
```

### 💼 Project Documentation

```
notes/
└── projects/
    ├── wiki-engine.md
    ├── api-design.md
    └── roadmap.md
```

### 📚 Knowledge Base

```
notes/
├── programming/
│   ├── python.md
│   └── javascript.md
├── books/
│   └── atomic-habits.md
└── ideas/
    └── startup-ideas.md
```

---

## 🎨 Customization

The project is easily extensible:

- 🎨 **Styles** — Modify `static/style.css` (colors, fonts, spacing)
- ⚙️ **Logic** — Add functions to `static/app.js`
- 📄 **Templates** — Change HTML in `templates/`
- 🛠️ **New Commands** — Add handlers in `main.py`

---

## 🐛 Debugging

If something goes wrong:

1. Check **YAML frontmatter** (indentation, quotes, colons)
2. Ensure **Markdown is valid** (closing tags, quotes)
3. Verify **folder permissions** (especially on Windows/Mac)
4. Check **console errors** — problematic files are skipped with a log message

---

## 🤝 Contributing

Want to improve the project?

1. Fork the repository
2. Create a branch `git checkout -b feature/your-feature`
3. Commit changes `git commit -am 'Added cool feature'`
4. Push to remote `git push origin feature/your-feature`
5. Create a **Pull Request** 🚀

---

## 📬 Support

Found a bug or have an idea? Create an **Issue** in the repository with:
- Problem description
- Steps to reproduce
- Python version and OS

---

## 📜 License

**MIT License** — Use freely in personal and commercial projects. Do whatever you want! 🎉

See the [LICENSE](LICENSE) file for details.

---

> 💡 **Tip:** Add an alias to your `.bashrc` or `profile`:  
> `alias wiki='python /path/to/personal-wiki/main.py serve --source ~/notes/'`  
> Now just type `wiki` in your terminal — and your knowledge base is ready!