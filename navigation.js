// Navigation and routing system for GIBRAT app

class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.isLoggedIn = this.checkLoginStatus();
        this.init();
    }

    init() {
        this.setActiveTab();
        this.setupNavigation();
        this.redirectIfNeeded();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'home.html';
        return filename;
    }

    checkLoginStatus() {
        return localStorage.getItem('userLoggedIn') === 'true';
    }

    setLoginStatus(logged) {
        if (logged) {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('loginTime', new Date().toISOString());
        } else {
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('loginTime');
        }
    }

    setActiveTab() {
        const tabItems = document.querySelectorAll('.tab-item');
        tabItems.forEach(tab => {
            tab.classList.remove('active');
            const href = tab.getAttribute('href');
            if (href === this.currentPage) {
                tab.classList.add('active');
            }
        });
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-item')) {
                const href = e.target.closest('.tab-item').getAttribute('href');
                this.navigateToPage(href);
            }
        });
    }

    navigateToPage(page) {
        // Protected pages - require login
        const protectedPages = ['home.html', 'проф.html', 'кур.html', 'урок.html', 'рейтинг.html', 'мчат.html', 'чат.html'];
        
        if (protectedPages.includes(page) && !this.isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }
        
        window.location.href = page;
    }

    redirectIfNeeded() {
        const publicPages = ['login.html', 'рег.html', 'вход.html'];
        const protectedPages = ['home.html', 'проф.html', 'кур.html', 'урок.html', 'рейтинг.html', 'мчат.html', 'чат.html'];

        if (publicPages.includes(this.currentPage) && this.isLoggedIn) {
            // If logged in and on public page, redirect to home
            // Uncomment if desired: window.location.href = 'home.html';
        }

        if (protectedPages.includes(this.currentPage) && !this.isLoggedIn) {
            window.location.href = 'login.html';
        }
    }

    logout() {
        this.setLoginStatus(false);
        window.location.href = 'login.html';
    }

    getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    setUserData(data) {
        localStorage.setItem('userData', JSON.stringify(data));
    }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    window.navManager = new NavigationManager();
});
