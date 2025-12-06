document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        // В реальном приложении: здесь происходит отправка данных на сервер
        // и проверка учетных данных.
        
        // --- ПЕРЕНАПРАВЛЕНИЕ ---
        console.log('Успешный вход! Перенаправление на главный экран.');
        window.location.href = 'home.html'; 
        // -----------------------
    });
});