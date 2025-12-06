// Form handling for login and registration pages

document.addEventListener('DOMContentLoaded', () => {
    handleLoginForm();
    handleRegisterForm();
});

function handleLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    // Replace link with proper form submission
    const submitBtn = form.querySelector('a.btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            const result = authManager.login(email, password);
            if (result.success) {
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        });
    }

    // Handle registration link
    const regLink = form.querySelector('a[href="рег.html"]');
    if (regLink) {
        regLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'рег.html';
        });
    }
}

function handleRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const submitBtn = form.querySelector('a.btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('reg-full-name')?.value;
            const email = document.getElementById('reg-email')?.value;
            const password = document.getElementById('reg-password')?.value;
            const confirmPassword = document.getElementById('reg-confirm-password')?.value;

            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            const result = authManager.register(fullName, email, password, confirmPassword);
            if (result.success) {
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        });
    }

    // Handle login link
    const loginLink = form.querySelector('a[href="login.html"]');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
}
