// Personal Wiki - Enhanced JavaScript
// Features: Theme switching, Language translations, Delete saved pages

const WikiApp = {
    // Translations dictionary
    translations: {
        en: {
            home: '🏠 Home',
            graph: '🕸️ Graph',
            search: '🔍 Search',
            newPage: '➕ New Page',
            pages: 'Pages',
            folders: 'Folders',
            welcome: '📚 Welcome to Your Personal Wiki',
            allPages: 'All Pages',
            noPages: 'No pages yet. Add some Markdown files to the notes folder!',
            searchPlaceholder: 'Search pages...',
            searchResults: 'Search Results',
            found: 'found',
            noResults: 'No results found',
            enterQuery: 'Enter a search query to find pages',
            newPageTitle: 'Create New Page',
            pageTitle: 'Page Title',
            pageContent: 'Page Content (Markdown)',
            create: 'Create',
            cancel: 'Cancel',
            delete: '🗑️ Delete',
            confirmDelete: 'Are you sure you want to delete this page?',
            deleteSuccess: 'Page deleted successfully',
            deleteError: 'Error deleting page',
            theme: 'Theme',
            language: 'Language',
            light: '☀️ Light',
            dark: '🌙 Dark',
            blue: '💙 Blue',
            green: '💚 Green',
            purple: '💜 Purple',
            orange: '🧡 Orange',
            // New Page specific
            createNewPage: 'Create New Page',
            createPageDesc: 'Create a new wiki page with Markdown formatting',
            labelTitle: 'Page Title *',
            placeholderTitle: 'Enter page title...',
            labelFolder: 'Folder (optional)',
            placeholderFolder: 'e.g., daily, projects',
            folderHint: 'Leave empty for root folder',
            labelTags: 'Tags (comma-separated)',
            placeholderTags: 'e.g., todo, important',
            labelContent: 'Content *',
            placeholderContent: 'Write your content in Markdown...',
            contentHint: 'Supports Markdown syntax: **bold**, *italic*, `code`, [[wiki links]], etc.',
            btnCreate: '✨ Create Page',
            btnCancel: 'Cancel',
            markdownTips: '📝 Markdown Tips',
            fillRequired: 'Please fill in the required fields (Title and Content)',
            toCreatePage: 'To create this page:'
        },
        ru: {
            home: '🏠 Главная',
            graph: '🕸️ Граф',
            search: '🔍 Поиск',
            newPage: '➕ Новая страница',
            pages: 'Страницы',
            folders: 'Папки',
            welcome: '📚 Добро пожаловать в вашу Вики',
            allPages: 'Все страницы',
            noPages: 'Пока нет страниц. Добавьте Markdown файлы в папку notes!',
            searchPlaceholder: 'Поиск страниц...',
            searchResults: 'Результаты поиска',
            found: 'найдено',
            noResults: 'Ничего не найдено',
            enterQuery: 'Введите запрос для поиска',
            newPageTitle: 'Создать новую страницу',
            pageTitle: 'Название страницы',
            pageContent: 'Содержимое (Markdown)',
            create: 'Создать',
            cancel: 'Отмена',
            delete: '🗑️ Удалить',
            confirmDelete: 'Вы уверены, что хотите удалить эту страницу?',
            deleteSuccess: 'Страница успешно удалена',
            deleteError: 'Ошибка при удалении страницы',
            theme: 'Тема',
            language: 'Язык',
            light: '☀️ Светлая',
            dark: '🌙 Тёмная',
            blue: '💙 Синяя',
            green: '💚 Зелёная',
            purple: '💜 Фиолетовая',
            orange: '🧡 Оранжевая',
            // New Page specific
            createNewPage: 'Создать новую страницу',
            createPageDesc: 'Создать новую вики-страницу с форматированием Markdown',
            labelTitle: 'Название страницы *',
            placeholderTitle: 'Введите название страницы...',
            labelFolder: 'Папка (необязательно)',
            placeholderFolder: 'например, daily, projects',
            folderHint: 'Оставьте пустым для корневой папки',
            labelTags: 'Теги (через запятую)',
            placeholderTags: 'например, todo, important',
            labelContent: 'Содержимое *',
            placeholderContent: 'Напишите содержимое в формате Markdown...',
            contentHint: 'Поддерживается синтаксис Markdown: **жирный**, *курсив*, `код`, [[wiki-ссылки]] и т.д.',
            btnCreate: '✨ Создать страницу',
            btnCancel: 'Отмена',
            markdownTips: '📝 Советы по Markdown',
            fillRequired: 'Пожалуйста, заполните обязательные поля (Название и Содержимое)',
            toCreatePage: 'Для создания этой страницы:'
        },
        es: {
            home: '🏠 Inicio',
            graph: '🕸️ Gráfico',
            search: '🔍 Buscar',
            newPage: '➕ Nueva Página',
            pages: 'Páginas',
            folders: 'Carpetas',
            welcome: '📚 Bienvenido a tu Wiki Personal',
            allPages: 'Todas las páginas',
            noPages: 'Aún no hay páginas. ¡Agrega archivos Markdown a la carpeta notes!',
            searchPlaceholder: 'Buscar páginas...',
            searchResults: 'Resultados de búsqueda',
            found: 'encontrado',
            noResults: 'No se encontraron resultados',
            enterQuery: 'Ingresa una consulta para buscar páginas',
            newPageTitle: 'Crear nueva página',
            pageTitle: 'Título de la página',
            pageContent: 'Contenido (Markdown)',
            create: 'Crear',
            cancel: 'Cancelar',
            delete: '🗑️ Eliminar',
            confirmDelete: '¿Estás seguro de que quieres eliminar esta página?',
            deleteSuccess: 'Página eliminada exitosamente',
            deleteError: 'Error al eliminar página',
            theme: 'Tema',
            language: 'Idioma',
            light: '☀️ Claro',
            dark: '🌙 Oscuro',
            blue: '💙 Azul',
            green: '💚 Verde',
            purple: '💜 Morado',
            orange: '🧡 Naranja',
            // New Page specific
            createNewPage: 'Crear nueva página',
            createPageDesc: 'Crear una nueva página wiki con formato Markdown',
            labelTitle: 'Título de la página *',
            placeholderTitle: 'Ingrese el título de la página...',
            labelFolder: 'Carpeta (opcional)',
            placeholderFolder: 'ej. daily, projects',
            folderHint: 'Dejar vacío para carpeta raíz',
            labelTags: 'Etiquetas (separadas por comas)',
            placeholderTags: 'ej. todo, important',
            labelContent: 'Contenido *',
            placeholderContent: 'Escribe tu contenido en Markdown...',
            contentHint: 'Soporta sintaxis Markdown: **negrita**, *cursiva*, `código`, [[enlaces wiki]], etc.',
            btnCreate: '✨ Crear página',
            btnCancel: 'Cancelar',
            markdownTips: '📝 Consejos de Markdown',
            fillRequired: 'Por favor complete los campos obligatorios (Título y Contenido)',
            toCreatePage: 'Para crear esta página:'
        },
        de: {
            home: '🏠 Startseite',
            graph: '🕸️ Graph',
            search: '🔍 Suche',
            newPage: '➕ Neue Seite',
            pages: 'Seiten',
            folders: 'Ordner',
            welcome: '📚 Willkommen zu Ihrem Personal Wiki',
            allPages: 'Alle Seiten',
            noPages: 'Noch keine Seiten. Fügen Sie Markdown-Dateien zum Notizen-Ordner hinzu!',
            searchPlaceholder: 'Seiten suchen...',
            searchResults: 'Suchergebnisse',
            found: 'gefunden',
            noResults: 'Keine Ergebnisse gefunden',
            enterQuery: 'Geben Sie eine Suchanfrage ein',
            newPageTitle: 'Neue Seite erstellen',
            pageTitle: 'Seitentitel',
            pageContent: 'Inhalt (Markdown)',
            create: 'Erstellen',
            cancel: 'Abbrechen',
            delete: '🗑️ Löschen',
            confirmDelete: 'Möchten Sie diese Seite wirklich löschen?',
            deleteSuccess: 'Seite erfolgreich gelöscht',
            deleteError: 'Fehler beim Löschen der Seite',
            theme: 'Thema',
            language: 'Sprache',
            light: '☀️ Hell',
            dark: '🌙 Dunkel',
            blue: '💙 Blau',
            green: '💚 Grün',
            purple: '💜 Lila',
            orange: '🧡 Orange',
            // New Page specific
            createNewPage: 'Neue Seite erstellen',
            createPageDesc: 'Erstellen Sie eine neue Wiki-Seite mit Markdown-Formatierung',
            labelTitle: 'Seitentitel *',
            placeholderTitle: 'Seitentitel eingeben...',
            labelFolder: 'Ordner (optional)',
            placeholderFolder: 'z.B. daily, projects',
            folderHint: 'Leer lassen für Root-Ordner',
            labelTags: 'Tags (durch Komma getrennt)',
            placeholderTags: 'z.B. todo, important',
            labelContent: 'Inhalt *',
            placeholderContent: 'Schreiben Sie Ihren Inhalt in Markdown...',
            contentHint: 'Unterstützt Markdown-Syntax: **fett**, *kursiv*, `code`, [[Wiki-Links]], etc.',
            btnCreate: '✨ Seite erstellen',
            btnCancel: 'Abbrechen',
            markdownTips: '📝 Markdown-Tipps',
            fillRequired: 'Bitte füllen Sie die erforderlichen Felder aus (Titel und Inhalt)',
            toCreatePage: 'Um diese Seite zu erstellen:'
        },
        fr: {
            home: '🏠 Accueil',
            graph: '🕸️ Graphe',
            search: '🔍 Recherche',
            newPage: '➕ Nouvelle Page',
            pages: 'Pages',
            folders: 'Dossiers',
            welcome: '📚 Bienvenue dans votre Wiki Personnel',
            allPages: 'Toutes les pages',
            noPages: 'Aucune page encore. Ajoutez des fichiers Markdown au dossier notes !',
            searchPlaceholder: 'Rechercher des pages...',
            searchResults: 'Résultats de recherche',
            found: 'trouvé',
            noResults: 'Aucun résultat trouvé',
            enterQuery: 'Entrez une requête pour trouver des pages',
            newPageTitle: 'Créer une nouvelle page',
            pageTitle: 'Titre de la page',
            pageContent: 'Contenu (Markdown)',
            create: 'Créer',
            cancel: 'Annuler',
            delete: '🗑️ Supprimer',
            confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette page ?',
            deleteSuccess: 'Page supprimée avec succès',
            deleteError: 'Erreur lors de la suppression',
            theme: 'Thème',
            language: 'Langue',
            light: '☀️ Clair',
            dark: '🌙 Sombre',
            blue: '💙 Bleu',
            green: '💚 Vert',
            purple: '💜 Violet',
            orange: '🧡 Orange',
            // New Page specific
            createNewPage: 'Créer une nouvelle page',
            createPageDesc: 'Créer une nouvelle page wiki avec formatage Markdown',
            labelTitle: 'Titre de la page *',
            placeholderTitle: 'Entrez le titre de la page...',
            labelFolder: 'Dossier (optionnel)',
            placeholderFolder: 'par ex. daily, projects',
            folderHint: 'Laisser vide pour le dossier racine',
            labelTags: 'Étiquettes (séparées par des virgules)',
            placeholderTags: 'par ex. todo, important',
            labelContent: 'Contenu *',
            placeholderContent: 'Écrivez votre contenu en Markdown...',
            contentHint: 'Syntaxe Markdown prise en charge : **gras**, *italique*, `code`, [[liens wiki]], etc.',
            btnCreate: '✨ Créer la page',
            btnCancel: 'Annuler',
            markdownTips: '📝 Astuces Markdown',
            fillRequired: 'Veuillez remplir les champs obligatoires (Titre et Contenu)',
            toCreatePage: 'Pour créer cette page :'
        },
        zh: {
            home: '🏠 首页',
            graph: '🕸️ 图谱',
            search: '🔍 搜索',
            newPage: '➕ 新建页面',
            pages: '页面',
            folders: '文件夹',
            welcome: '📚 欢迎来到您的个人维基',
            allPages: '所有页面',
            noPages: '暂无页面。请添加 Markdown 文件到 notes 文件夹！',
            searchPlaceholder: '搜索页面...',
            searchResults: '搜索结果',
            found: '找到',
            noResults: '未找到结果',
            enterQuery: '输入查询以查找页面',
            newPageTitle: '创建新页面',
            pageTitle: '页面标题',
            pageContent: '内容（Markdown）',
            create: '创建',
            cancel: '取消',
            delete: '🗑️ 删除',
            confirmDelete: '确定要删除此页面吗？',
            deleteSuccess: '页面删除成功',
            deleteError: '删除页面出错',
            theme: '主题',
            language: '语言',
            light: '☀️ 浅色',
            dark: '🌙 深色',
            blue: '💙 蓝色',
            green: '💚 绿色',
            purple: '💜 紫色',
            orange: '🧡 橙色',
            // New Page specific
            createNewPage: '创建新页面',
            createPageDesc: '使用 Markdown 格式创建新的维基页面',
            labelTitle: '页面标题 *',
            placeholderTitle: '输入页面标题...',
            labelFolder: '文件夹（可选）',
            placeholderFolder: '例如：daily, projects',
            folderHint: '留空则创建到根文件夹',
            labelTags: '标签（逗号分隔）',
            placeholderTags: '例如：todo, important',
            labelContent: '内容 *',
            placeholderContent: '用 Markdown 编写内容...',
            contentHint: '支持 Markdown 语法：**粗体**，*斜体*，`代码`，[[wiki 链接]] 等',
            btnCreate: '✨ 创建页面',
            btnCancel: '取消',
            markdownTips: '📝 Markdown 提示',
            fillRequired: '请填写必填字段（标题和内容）',
            toCreatePage: '创建此页面的步骤:'
        },
        ja: {
            home: '🏠 ホーム',
            graph: '🕸️ グラフ',
            search: '🔍 検索',
            newPage: '➕ 新しいページ',
            pages: 'ページ',
            folders: 'フォルダー',
            welcome: '📚 あなたの個人ウィキへようこそ',
            allPages: 'すべてのページ',
            noPages: 'まだページがありません。notes フォルダーに Markdown ファイルを追加してください！',
            searchPlaceholder: 'ページを検索...',
            searchResults: '検索結果',
            found: '件見つかりました',
            noResults: '結果が見つかりません',
            enterQuery: '検索クエリを入力してください',
            newPageTitle: '新しいページを作成',
            pageTitle: 'ページタイトル',
            pageContent: 'コンテンツ（Markdown）',
            create: '作成',
            cancel: 'キャンセル',
            delete: '🗑️ 削除',
            confirmDelete: 'このページを削除してもよろしいですか？',
            deleteSuccess: 'ページが正常に削除されました',
            deleteError: 'ページの削除エラー',
            theme: 'テーマ',
            language: '言語',
            light: '☀️ ライト',
            dark: '🌙 ダーク',
            blue: '💙 ブルー',
            green: '💚 グリーン',
            purple: '💜 パープル',
            orange: '🧡 オレンジ',
            // New Page specific
            createNewPage: '新しいページを作成',
            createPageDesc: 'Markdown 形式で新しいウィキページを作成',
            labelTitle: 'ページタイトル *',
            placeholderTitle: 'ページタイトルを入力...',
            labelFolder: 'フォルダー（オプション）',
            placeholderFolder: '例：daily, projects',
            folderHint: '空のままならルートフォルダーに作成',
            labelTags: 'タグ（カンマ区切り）',
            placeholderTags: '例：todo, important',
            labelContent: 'コンテンツ *',
            placeholderContent: 'Markdown で内容を書きます...',
            contentHint: 'Markdown 構文対応：**太字**，*イタリック*，`コード`，[[wiki リンク]] など',
            btnCreate: '✨ ページを作成',
            btnCancel: 'キャンセル',
            markdownTips: '📝 Markdown のヒント',
            fillRequired: '必須項目（タイトルとコンテンツ）を入力してください',
            toCreatePage: 'このページを作成するには:'
        }
    },

    // Current state
    currentLang: 'en',
    currentTheme: 'light',

    // Initialize the app
    init() {
        this.loadSettings();
        this.applyTheme(this.currentTheme);
        this.setupThemeSelector();
        this.setupLanguageSelector();
        this.setupDeleteButtons();
        this.translatePage();
        this.setupBreadcrumbs();
        this.setupBacklinks();
        this.setupOutline();
        this.setupCommandPalette();
        this.setupDailyNotes();
        this.setupTemplates();
        this.setupQuickSwitcher();
        this.setupHoverPreview();
        this.setupReadingProgress();
        console.log('Personal Wiki loaded with i18n, themes, and Pro features');
    },

    // Load settings from localStorage
    loadSettings() {
        const savedLang = localStorage.getItem('wiki_lang');
        const savedTheme = localStorage.getItem('wiki_theme');
        
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        }
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
    },

    // Save settings to localStorage
    saveSettings() {
        localStorage.setItem('wiki_lang', this.currentLang);
        localStorage.setItem('wiki_theme', this.currentTheme);
    },

    // Apply theme to document
    applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        this.currentTheme = themeName;
        this.saveSettings();
        this.updateThemeSelectorUI();
    },

    // Setup theme selector
    setupThemeSelector() {
        const btn = document.querySelector('.theme-selector-btn');
        const dropdown = document.querySelector('.theme-dropdown');
        
        if (!btn || !dropdown) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            document.querySelector('.lang-dropdown')?.classList.remove('show');
        });

        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                this.applyTheme(theme);
                dropdown.classList.remove('show');
            });
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    },

    // Update theme selector UI
    updateThemeSelectorUI() {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-theme') === this.currentTheme);
        });
    },

    // Setup language selector
    setupLanguageSelector() {
        const btn = document.querySelector('.lang-selector-btn');
        const dropdown = document.querySelector('.lang-dropdown');
        
        if (!btn || !dropdown) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            document.querySelector('.theme-dropdown')?.classList.remove('show');
        });

        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                dropdown.classList.remove('show');
            });
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    },

    // Set language
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.saveSettings();
            this.translatePage();
            this.updateLanguageSelectorUI();
        }
    },

    // Update language selector UI
    updateLanguageSelectorUI() {
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === this.currentLang);
        });
        const btn = document.querySelector('.lang-selector-btn');
        if (btn) {
            btn.textContent = this.currentLang.toUpperCase();
        }
    },

    // Translate page content
    translatePage() {
        const t = this.translations[this.currentLang];
        
        // Translate navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html') link.innerHTML = t.home;
            else if (href === 'graph.html') link.innerHTML = t.graph;
            else if (href === 'search.html') link.innerHTML = t.search;
            else if (href === 'new.html') link.innerHTML = t.newPage;
        });

        // Translate section headers
        document.querySelectorAll('.nav-section h3').forEach(header => {
            if (header.textContent.trim() === 'Pages') header.textContent = t.pages;
            else if (header.textContent.trim() === 'Folders') header.textContent = t.folders;
        });

        // Translate welcome message
        const welcomeHeader = document.querySelector('.page-header h1');
        if (welcomeHeader && welcomeHeader.textContent.includes('Welcome')) {
            welcomeHeader.textContent = t.welcome;
        }

        // Translate search placeholder
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = t.searchPlaceholder;
        }

        // Translate search results header
        const resultsHeader = document.querySelector('.results-header h2');
        if (resultsHeader) {
            resultsHeader.textContent = t.searchResults;
        }

        // Translate "All Pages" text
        document.querySelectorAll('h2').forEach(h2 => {
            if (h2.textContent.startsWith('All Pages')) {
                const count = h2.textContent.match(/\d+/)?.[0] || '';
                h2.textContent = `${t.allPages} (${count})`;
            }
        });

        // Translate New Page form elements
        const newPageHeader = document.querySelector('.new-page-header h1');
        if (newPageHeader) {
            newPageHeader.textContent = t.createNewPage;
        }
        
        const newPageDesc = document.querySelector('.new-page-header p');
        if (newPageDesc) {
            newPageDesc.textContent = t.createPageDesc;
        }
        
        // Translate form labels and placeholders
        const labelTitle = document.querySelector('label[for="title"]');
        if (labelTitle) labelTitle.textContent = t.labelTitle;
        
        const inputTitle = document.getElementById('title');
        if (inputTitle) inputTitle.placeholder = t.placeholderTitle;
        
        const labelFolder = document.querySelector('label[for="folder"]');
        if (labelFolder) labelFolder.textContent = t.labelFolder;
        
        const inputFolder = document.getElementById('folder');
        if (inputFolder) inputFolder.placeholder = t.placeholderFolder;
        
        const folderHint = document.querySelector('label[for="folder"] + small');
        if (folderHint) folderHint.textContent = t.folderHint;
        
        const labelTags = document.querySelector('label[for="tags"]');
        if (labelTags) labelTags.textContent = t.labelTags;
        
        const inputTags = document.getElementById('tags');
        if (inputTags) inputTags.placeholder = t.placeholderTags;
        
        const labelContent = document.querySelector('label[for="content"]');
        if (labelContent) labelContent.textContent = t.labelContent;
        
        const textareaContent = document.getElementById('content');
        if (textareaContent) textareaContent.placeholder = t.placeholderContent;
        
        const contentHint = document.querySelector('label[for="content"] + small');
        if (contentHint) contentHint.textContent = t.contentHint;
        
        // Translate buttons
        const btnCreate = document.querySelector('.btn-primary');
        if (btnCreate && btnCreate.type === 'submit') btnCreate.textContent = t.btnCreate;
        
        const btnCancel = document.querySelector('.btn-secondary');
        if (btnCancel) btnCancel.textContent = t.btnCancel;
        
        // Translate help section
        const helpSection = document.querySelector('.help-section h3');
        if (helpSection) helpSection.textContent = t.markdownTips;
        
        // Update language button
        this.updateLanguageSelectorUI();
    },

    // Setup delete buttons
    setupDeleteButtons() {
        // Add delete button to page cards on index page
        document.querySelectorAll('.page-card').forEach(card => {
            if (!card.querySelector('.delete-btn')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '🗑️';
                deleteBtn.title = this.translations[this.currentLang].delete;
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const title = card.querySelector('h3 a')?.textContent || '';
                    this.confirmDelete(title, card);
                });
                card.appendChild(deleteBtn);
            }
        });

        // Add delete button to page header if on individual page
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !document.querySelector('.page-delete-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'page-delete-btn';
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = this.translations[this.currentLang].delete;
            deleteBtn.style.cssText = 'margin-left: 16px; cursor: pointer; background: none; border: none; font-size: 20px; opacity: 0.6; transition: opacity 0.2s;';
            deleteBtn.onmouseover = () => deleteBtn.style.opacity = '1';
            deleteBtn.onmouseout = () => deleteBtn.style.opacity = '0.6';
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = pageHeader.textContent.replace('🗑️', '').trim();
                this.confirmDelete(title);
            });
            pageHeader.appendChild(deleteBtn);
        }
    },

    // Handle delete page from button click
    handleDeletePage(slug) {
        const t = this.translations[this.currentLang];
        
        if (confirm(`${t.confirmDelete}`)) {
            // Call API to delete the page
            fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(t.deleteSuccess);
                    window.location.href = 'index.html';
                } else {
                    alert(`${t.deleteError}: ${data.error}`);
                }
            })
            .catch(error => {
                alert(`${t.deleteError}: ${error.message}`);
            });
        }
    },
    
    // Confirm and delete page
    confirmDelete(title, cardElement) {
        const t = this.translations[this.currentLang];
        
        if (confirm(`${t.confirmDelete}\n\n"${title}"`)) {
            // Generate slug from title for API call
            const slug = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            
            // Call API to delete the page
            fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (cardElement) {
                        cardElement.style.transition = 'all 0.3s ease';
                        cardElement.style.opacity = '0';
                        cardElement.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            cardElement.remove();
                            const remaining = document.querySelectorAll('.page-card').length;
                            const allPagesHeader = document.querySelector('h2');
                            if (allPagesHeader && allPagesHeader.textContent.includes(t.allPages)) {
                                allPagesHeader.textContent = `${t.allPages} (${remaining})`;
                            }
                            alert(t.deleteSuccess);
                        }, 300);
                    } else {
                        alert(t.deleteSuccess);
                        window.location.href = 'index.html';
                    }
                } else {
                    alert(`${t.deleteError}: ${data.error}`);
                }
            })
            .catch(error => {
                alert(`${t.deleteError}: ${error.message}`);
            });
        }
    },
    
    // Handle create page form submission with translations
    handleCreate(event) {
        event.preventDefault();
        const t = this.translations[this.currentLang];
        
        const title = document.getElementById('title').value.trim();
        const folder = document.getElementById('folder').value.trim();
        const tagsInput = document.getElementById('tags').value.trim();
        const content = document.getElementById('content').value.trim();
        
        if (!title || !content) {
            alert(t.fillRequired);
            return;
        }
        
        // Parse tags
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
        
        // Show loading state
        const submitBtn = document.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Creating...';
        submitBtn.disabled = true;
        
        // Send to API
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                folder,
                tags: tags.join(','),
                content
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the new page
                window.location.href = `${data.slug}.html`;
            } else {
                alert(`Error: ${data.error}`);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            alert(`Error creating page: ${error.message}`);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    },

    // === OBSIDIAN & NOTION STYLE FEATURES ===

    // Setup breadcrumbs navigation
    setupBreadcrumbs() {
        const pageHeader = document.querySelector('.page-header h1');
        if (!pageHeader) return;

        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumb-nav';
        breadcrumbContainer.innerHTML = `
            <a href="index.html" class="breadcrumb-item">🏠 Home</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item current">${pageHeader.textContent}</span>
        `;
        pageHeader.parentNode.insertBefore(breadcrumbContainer, pageHeader);
    },

    // Setup backlinks section (Obsidian-style)
    setupBacklinks() {
        const pageContent = document.querySelector('.page-content');
        if (!pageContent) return;

        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const pageTitle = document.querySelector('.page-header h1')?.textContent || '';
        
        // Find all pages that might link to this one
        const allLinks = document.querySelectorAll('a[href]');
        const backlinkPages = [];
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(`${currentPage}.html`)) {
                const pageCard = link.closest('.page-card') || link.closest('li');
                if (pageCard) {
                    const titleEl = pageCard.querySelector('h3 a, a[href]');
                    if (titleEl && !backlinkPages.includes(titleEl.textContent)) {
                        backlinkPages.push(titleEl.textContent);
                    }
                }
            }
        });

        if (backlinkPages.length > 0) {
            const backlinksSection = document.createElement('div');
            backlinksSection.className = 'backlinks-section';
            backlinksSection.innerHTML = `
                <h3>🔗 Backlinks</h3>
                <div class="backlinks-list">
                    ${backlinkPages.map(title => `
                        <div class="backlink-item">
                            <a href="${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html">${title}</a>
                        </div>
                    `).join('')}
                </div>
            `;
            pageContent.after(backlinksSection);
        }
    },

    // Setup table of contents / outline (Notion-style)
    setupOutline() {
        const pageContent = document.querySelector('.page-content');
        if (!pageContent) return;

        const headings = pageContent.querySelectorAll('h1, h2, h3, h4');
        if (headings.length < 2) return;

        const outlineContainer = document.createElement('aside');
        outlineContainer.className = 'outline-panel';
        outlineContainer.innerHTML = `
            <h4 class="outline-title">📑 Outline</h4>
            <nav class="outline-nav">
                ${Array.from(headings).map((heading, index) => {
                    const id = heading.id || `heading-${index}`;
                    heading.id = id;
                    const level = parseInt(heading.tagName.charAt(1));
                    const indent = (level - 1) * 12;
                    return `<a href="#${id}" class="outline-item" style="padding-left: ${indent}px">${heading.textContent}</a>`;
                }).join('')}
            </nav>
        `;
        
        const content = document.querySelector('.content');
        if (content) {
            content.classList.add('has-outline');
            content.appendChild(outlineContainer);
        }
    },

    // Command palette (Ctrl/Cmd + P) - Obsidian/Notion style
    setupCommandPalette() {
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.innerHTML = `
            <div class="command-palette-overlay"></div>
            <div class="command-palette-modal">
                <div class="command-palette-input-wrapper">
                    <span class="command-palette-icon">⌘</span>
                    <input type="text" class="command-palette-input" placeholder="Type a command or search...">
                </div>
                <div class="command-palette-results"></div>
            </div>
        `;
        document.body.appendChild(palette);

        const commands = [
            { icon: '🏠', label: 'Go to Home', action: () => window.location.href = 'index.html' },
            { icon: '🕸️', label: 'Open Graph View', action: () => window.location.href = 'graph.html' },
            { icon: '🔍', label: 'Search Pages', action: () => window.location.href = 'search.html' },
            { icon: '➕', label: 'Create New Page', action: () => window.location.href = 'new.html' },
            { icon: '🌙', label: 'Toggle Dark Mode', action: () => this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark') },
            { icon: '📅', label: "Today's Daily Note", action: () => {
                const today = new Date().toISOString().split('T')[0];
                window.location.href = `daily/${today}.html`;
            }},
        ];

        const showPalette = () => {
            palette.classList.add('active');
            const input = palette.querySelector('.command-palette-input');
            input.value = '';
            input.focus();
            renderResults(commands);
        };

        const hidePalette = () => {
            palette.classList.remove('active');
        };

        const renderResults = (items) => {
            const resultsContainer = palette.querySelector('.command-palette-results');
            resultsContainer.innerHTML = items.map((cmd, index) => `
                <div class="command-item ${index === 0 ? 'selected' : ''}" data-index="${index}">
                    <span class="command-icon">${cmd.icon}</span>
                    <span class="command-label">${cmd.label}</span>
                </div>
            `).join('');

            palette.querySelectorAll('.command-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    commands[index].action();
                    hidePalette();
                });
            });
        };

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                showPalette();
            }
            if (e.key === 'Escape' && palette.classList.contains('active')) {
                hidePalette();
            }
        });

        // Search filtering
        palette.querySelector('.command-palette-input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = commands.filter(cmd => 
                cmd.label.toLowerCase().includes(query)
            );
            renderResults(filtered);
        });
    },

    // Daily notes feature (Obsidian-style)
    setupDailyNotes() {
        const navSection = document.querySelector('.sidebar-nav');
        if (!navSection) return;

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

        const dailyNoteLink = document.createElement('a');
        dailyNoteLink.className = 'nav-link daily-note-link';
        dailyNoteLink.href = `daily/${formattedDate}.html`;
        dailyNoteLink.innerHTML = `📅 ${dayName}`;
        dailyNoteLink.title = "Today's Daily Note";

        const pagesSection = navSection.querySelector('.nav-section:first-child');
        if (pagesSection) {
            pagesSection.parentNode.insertBefore(dailyNoteLink, pagesSection);
        }
    },

    // Templates system (Notion-style)
    setupTemplates() {
        const newPageForm = document.querySelector('#createPageForm');
        if (!newPageForm) return;

        const templates = {
            'meeting': `## Meeting Notes\n\n**Date:** ${new Date().toLocaleDateString()}\n**Attendees:** \n\n### Agenda\n- [ ] Topic 1\n- [ ] Topic 2\n\n### Notes\n\n\n### Action Items\n- [ ] `,
            'project': `# Project Name\n\n## Overview\n\n\n## Goals\n- [ ] \n\n## Tasks\n- [ ] \n\n## Resources\n\n`,
            'daily': `# ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}\n\n## Morning\n\n\n## Afternoon\n\n\n## Evening\n\n\n### Gratitude\n1. \n2. \n3. \n\n### Notes\n\n`,
            'book-notes': `# Book Notes\n\n## Book Title\n\n## Author\n\n## Key Ideas\n\n\n## Quotes\n\n\n## Summary\n\n`,
        };

        const templateSelector = document.createElement('div');
        templateSelector.className = 'template-selector';
        templateSelector.innerHTML = `
            <label for="templateSelect">📝 Choose Template:</label>
            <select id="templateSelect">
                <option value="">Blank Page</option>
                <option value="meeting">Meeting Notes</option>
                <option value="project">Project Plan</option>
                <option value="daily">Daily Note</option>
                <option value="book-notes">Book Notes</option>
            </select>
        `;

        const titleInput = document.getElementById('title');
        if (titleInput) {
            titleInput.parentNode.insertBefore(templateSelector, titleInput.nextSibling);
        }

        document.getElementById('templateSelect')?.addEventListener('change', (e) => {
            const template = templates[e.target.value];
            if (template) {
                const contentArea = document.getElementById('content');
                if (contentArea) {
                    contentArea.value = template;
                }
            }
        });
    },

    // Quick switcher (Obsidian-style Ctrl/Cmd + O)
    setupQuickSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'quick-switcher';
        switcher.innerHTML = `
            <div class="quick-switcher-overlay"></div>
            <div class="quick-switcher-modal">
                <div class="quick-switcher-input-wrapper">
                    <span class="quick-switcher-icon">🔍</span>
                    <input type="text" class="quick-switcher-input" placeholder="Jump to a page...">
                </div>
                <div class="quick-switcher-results"></div>
            </div>
        `;
        document.body.appendChild(switcher);

        const showSwitcher = () => {
            switcher.classList.add('active');
            const input = switcher.querySelector('.quick-switcher-input');
            input.value = '';
            input.focus();
            
            // Load all pages
            const pageCards = document.querySelectorAll('.page-card h3 a');
            const pages = Array.from(pageCards).map(a => ({
                title: a.textContent,
                href: a.getAttribute('href')
            }));
            
            renderPages(pages);
        };

        const hideSwitcher = () => {
            switcher.classList.remove('active');
        };

        const renderPages = (pages) => {
            const resultsContainer = switcher.querySelector('.quick-switcher-results');
            resultsContainer.innerHTML = pages.slice(0, 10).map((page, index) => `
                <div class="switcher-item ${index === 0 ? 'selected' : ''}" data-href="${page.href}">
                    <span class="switcher-icon">📄</span>
                    <span class="switcher-title">${page.title}</span>
                </div>
            `).join('');

            resultsContainer.querySelectorAll('.switcher-item').forEach(item => {
                item.addEventListener('click', () => {
                    window.location.href = item.dataset.href;
                });
            });
        };

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
                e.preventDefault();
                showSwitcher();
            }
            if (e.key === 'Escape' && switcher.classList.contains('active')) {
                hideSwitcher();
            }
        });

        // Search filtering
        switcher.querySelector('.quick-switcher-input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const pageCards = document.querySelectorAll('.page-card h3 a');
            const pages = Array.from(pageCards)
                .filter(a => a.textContent.toLowerCase().includes(query))
                .map(a => ({
                    title: a.textContent,
                    href: a.getAttribute('href')
                }));
            
            renderPages(pages);
        });
    },

    // Hover preview for wiki links (Obsidian-style)
    setupHoverPreview() {
        const wikiLinks = document.querySelectorAll('.wiki-link, a[href$=".html"]');
        
        wikiLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;

                const preview = document.createElement('div');
                preview.className = 'link-preview';
                preview.innerHTML = `
                    <div class="preview-loading">Loading preview...</div>
                `;
                document.body.appendChild(preview);

                const updatePosition = () => {
                    const rect = link.getBoundingClientRect();
                    preview.style.left = `${rect.left}px`;
                    preview.style.top = `${rect.bottom + 10}px`;
                };

                updatePosition();
                preview.style.opacity = '1';

                // Fetch preview content
                fetch(href)
                    .then(res => res.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const content = doc.querySelector('.page-content');
                        const title = doc.querySelector('.page-header h1');
                        
                        preview.innerHTML = `
                            <div class="preview-content">
                                <h4>${title?.textContent || 'Preview'}</h4>
                                <p>${content?.textContent?.substring(0, 200) || 'No content'}...</p>
                            </div>
                        `;
                    })
                    .catch(() => {
                        preview.innerHTML = '<div class="preview-error">Could not load preview</div>';
                    });

                link._preview = preview;
            });

            link.addEventListener('mouseleave', () => {
                if (link._preview) {
                    link._preview.remove();
                    link._preview = null;
                }
            });
        });
    },

    // Reading progress bar (Notion-style)
    setupReadingProgress() {
        const pageContent = document.querySelector('.page-content');
        if (!pageContent) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(progressBar);

        const fill = progressBar.querySelector('.reading-progress-fill');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            fill.style.width = `${scrollPercent}%`;
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    WikiApp.init();
});
