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
            orange: '🧡 Orange'
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
            orange: '🧡 Оранжевая'
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
            orange: '🧡 Naranja'
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
            orange: '🧡 Orange'
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
            orange: '🧡 Orange'
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
            orange: '🧡 橙色'
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
            orange: '🧡 オレンジ'
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
        console.log('Personal Wiki loaded with i18n and themes');
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

    // Confirm and delete page
    confirmDelete(title, cardElement) {
        const t = this.translations[this.currentLang];
        
        if (confirm(`${t.confirmDelete}\n\n"${title}"`)) {
            // For static site, we simulate deletion by hiding the element
            // In a real app, this would make an API call to delete the file
            if (cardElement) {
                cardElement.style.transition = 'all 0.3s ease';
                cardElement.style.opacity = '0';
                cardElement.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    cardElement.remove();
                    // Update page count
                    const remaining = document.querySelectorAll('.page-card').length;
                    const allPagesHeader = document.querySelector('h2');
                    if (allPagesHeader && allPagesHeader.textContent.includes(t.allPages)) {
                        allPagesHeader.textContent = `${t.allPages} (${remaining})`;
                    }
                    alert(t.deleteSuccess);
                }, 300);
            } else {
                // On individual page, redirect to home after "deletion"
                alert(t.deleteSuccess);
                window.location.href = 'index.html';
            }
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    WikiApp.init();
});
