// Authentication system for GIBRAT app

class AuthManager {
    constructor() {
        this.validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.minPasswordLength = 6;
    }

    validateEmailFormat(email) {
        return this.validateEmail.test(email);
    }

    validatePassword(password) {
        return password && password.length >= this.minPasswordLength;
    }

    validatePasswords(password, confirmPassword) {
        return password === confirmPassword;
    }

    hashPassword(password) {
        // Simple hash for demo - use proper backend hashing in production
        return btoa(password); // Base64 encoding
    }

    login(email, password) {
        if (!this.validateEmailFormat(email)) {
            return { success: false, message: 'Invalid email format' };
        }

        if (!this.validatePassword(password)) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Store user data
        const userData = {
            email: email,
            loginTime: new Date().toISOString(),
            theme: 'light'
        };

        if (window.navManager) {
            window.navManager.setLoginStatus(true);
            window.navManager.setUserData(userData);
        }

        return { success: true, message: 'Login successful' };
    }

    register(fullName, email, password, confirmPassword) {
        if (!fullName || fullName.trim().length === 0) {
            return { success: false, message: 'Full name is required' };
        }

        if (!this.validateEmailFormat(email)) {
            return { success: false, message: 'Invalid email format' };
        }

        if (!this.validatePassword(password)) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        if (!this.validatePasswords(password, confirmPassword)) {
            return { success: false, message: 'Passwords do not match' };
        }

        // Store user data
        const userData = {
            fullName: fullName,
            email: email,
            registrationTime: new Date().toISOString(),
            theme: 'light'
        };

        if (window.navManager) {
            window.navManager.setLoginStatus(true);
            window.navManager.setUserData(userData);
        }

        return { success: true, message: 'Registration successful' };
    }

    logout() {
        if (window.navManager) {
            window.navManager.logout();
        }
    }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
