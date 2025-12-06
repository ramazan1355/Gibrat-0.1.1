// Обработка форм с интеграцией Firebase

document.addEventListener('DOMContentLoaded', () => {
  handleLoginForm();
  handleRegisterForm();
});

function handleLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const submitBtn = form.querySelector('a.btn, button.btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email')?.value?.trim();
      const password = document.getElementById('password')?.value;

      if (!email || !password) {
        showErrorMessage('Пожалуйста, заполните все поля');
        return;
      }

      // Показываем индикатор загрузки
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Загрузка...';
      submitBtn.disabled = true;

      try {
        const result = await firebaseAuthManager.login(email, password);
        
        if (result.success) {
          showSuccessMessage('Вход выполнен! Перенаправление...');
          setTimeout(() => {
            window.location.href = 'home.html';
          }, 1000);
        } else {
          showErrorMessage(result.message);
        }
      } catch (error) {
        console.error('Ошибка входа:', error);
        showErrorMessage('Произошла непредвиденная ошибка');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Обработка ссылки на регистрацию
  const regLink = form.querySelector('a[href*="рег"]');
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

  const submitBtn = form.querySelector('a.btn, button.btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const fullName = document.getElementById('reg-full-name')?.value?.trim();
      const email = document.getElementById('reg-email')?.value?.trim();
      const password = document.getElementById('reg-password')?.value;
      const confirmPassword = document.getElementById('reg-confirm-password')?.value;

      if (!fullName || !email || !password || !confirmPassword) {
        showErrorMessage('Пожалуйста, заполните все поля');
        return;
      }

      // Показываем индикатор загрузки
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Загрузка...';
      submitBtn.disabled = true;

      try {
        const result = await firebaseAuthManager.register(fullName, email, password, confirmPassword);
        
        if (result.success) {
          showSuccessMessage('Регистрация успешна! Перенаправление...');
          setTimeout(() => {
            window.location.href = 'home.html';
          }, 1000);
        } else {
          showErrorMessage(result.message);
        }
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        showErrorMessage('Произошла непредвиденная ошибка');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Обработка ссылки на вход
  const loginLink = form.querySelector('a[href="login.html"]');
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
}

// Показ сообщения об ошибке
function showErrorMessage(message) {
  // Удаляем старые сообщения
  const oldMessages = document.querySelectorAll('.error-message, .success-message');
  oldMessages.forEach(msg => msg.remove());

  // Создаем новое сообщение об ошибке
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff6b6b;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 9999;
    animation: slideDown 0.3s ease;
  `;

  document.body.appendChild(errorDiv);

  // Удаляем сообщение через 5 секунд
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Показ сообщения об успехе
function showSuccessMessage(message) {
  // Удаляем старые сообщения
  const oldMessages = document.querySelectorAll('.error-message, .success-message');
  oldMessages.forEach(msg => msg.remove());

  // Создаем новое сообщение об успехе
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #51cf66;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 9999;
    animation: slideDown 0.3s ease;
  `;

  document.body.appendChild(successDiv);

  // Удаляем сообщение через 5 секунд
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Добавляем стили анимации
if (!document.querySelector('style[data-animation]')) {
  const style = document.createElement('style');
  style.setAttribute('data-animation', 'true');
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}
