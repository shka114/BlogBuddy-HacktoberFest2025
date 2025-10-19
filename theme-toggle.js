// Theme toggle script
(function () {
    const THEME_KEY = 'theme'; // 'light' or 'dark'
    const toggleBtn = document.getElementById('themeToggle');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (toggleBtn) {
            toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggleBtn.setAttribute('aria-pressed', theme === 'dark');
            toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    function init() {
        if (!toggleBtn) return;

        // Load saved preference
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark' || saved === 'light') {
            applyTheme(saved);
        } else {
            // Default: follow system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }

        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem(THEME_KEY, next);
            applyTheme(next);
        });
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
