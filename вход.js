document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.getElementById('signup-btn');
    const loginButton = document.getElementById('login-btn');

    // Обработчик для кнопки "sing up"
    signupButton.addEventListener('click', () => {
        console.log('Нажата кнопка "sing up" (Регистрация).');
        // Здесь будет код для перехода на страницу регистрации
        // window.location.href = '/register'; 
    });

    // Обработчик для кнопки "login"
    loginButton.addEventListener('click', () => {
        console.log('Нажата кнопка "login" (Вход).');
        // Здесь будет код для перехода на страницу входа
        // window.location.href = '/login'; 
    });
});