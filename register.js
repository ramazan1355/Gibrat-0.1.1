document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        // Получение значений полей
        // const fullName = document.getElementById('reg-full-name').value; 
        // const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        
        // 1. Проверка совпадения паролей
        if (password !== confirmPassword) {
            alert('Ошибка: Пароли не совпадают!');
            console.error('Пароли не совпадают!');
            return; 
        }

        // В реальном приложении: здесь происходит отправка данных на сервер
        
        // --- ПЕРЕНАПРАВЛЕНИЕ ---
        console.log('Успешная регистрация! Перенаправление на главный экран.');
        window.location.href = 'home.html';
        // -----------------------
    });
});