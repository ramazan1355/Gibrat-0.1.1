// Менеджер профиля пользователя

document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();
  setupLogoutButton();
  setupProfileUpdate();
});

async function loadUserProfile() {
  const userData = localStorage.getItem('userData');
  if (!userData) return;

  const user = JSON.parse(userData);
  
  // Обновляем элементы профиля
  const mentorName = document.querySelector('.mentor-name');
  const mentorEmail = document.querySelector('.mentor-email');
  const mentorAvatar = document.querySelector('.mentor-avatar');
  
  if (mentorName) mentorName.textContent = user.fullName || user.email;
  if (mentorEmail) mentorEmail.textContent = user.email;
  if (mentorAvatar && user.avatar) {
    mentorAvatar.src = user.avatar;
  }

  // Показываем данные на других страницах
  updateAllUserElements(user);
}

function updateAllUserElements(user) {
  // Обновляем приветствие на главной странице
  const newsTitle = document.querySelector('.news-title');
  if (newsTitle) {
    newsTitle.textContent = `Добро пожаловать, ${user.fullName || user.email}!`;
  }

  // Добавляем информацию о пользователе в шапку
  const header = document.querySelector('.header');
  if (header && !document.querySelector('.user-info-header')) {
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info-header';
    userInfo.innerHTML = `
      <span class="user-email">${user.email}</span>
      <button class="logout-btn" id="logout-header-btn">Выход</button>
    `;
    userInfo.style.cssText = `
      position: absolute;
      right: 20px;
      top: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #666;
    `;
    header.style.position = 'relative';
    header.appendChild(userInfo);
    
    const headerLogoutBtn = document.getElementById('logout-header-btn');
    if (headerLogoutBtn) {
      headerLogoutBtn.style.cssText = `
        padding: 5px 10px;
        background-color: #ff6b6b;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      `;
      headerLogoutBtn.addEventListener('click', logout);
    }
  }
}

function setupLogoutButton() {
  // Основная кнопка выхода в профиле
  const profileLogoutBtn = document.querySelector('.profile-logout-btn');
  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', logout);
  }

  // Кнопка выхода в шапке (если она была создана)
  const headerLogoutBtn = document.getElementById('logout-header-btn');
  if (headerLogoutBtn) {
    headerLogoutBtn.addEventListener('click', logout);
  }
}

async function logout() {
  try {
    if (window.firebaseAuthManager) {
      const result = await window.firebaseAuthManager.logout();
      if (result.success) {
        showSuccessMessage('Вы вышли из системы');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }
    } else {
      // Fallback если Firebase не загружен
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userData');
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Ошибка выхода:', error);
    showErrorMessage('Ошибка при выходе');
  }
}

function setupProfileUpdate() {
  // Поиск кнопок редактирования профиля
  const editButtons = document.querySelectorAll('.edit-profile-btn, [data-action="edit-profile"]');
  
  editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showProfileEditModal();
    });
  });
}

function showProfileEditModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  const modal = document.createElement('div');
  modal.className = 'profile-edit-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Редактировать профиль</h2>
      <form id="profile-edit-form">
        <div class="form-group">
          <label>Полное имя</label>
          <input type="text" id="edit-fullname" value="${userData.fullName || ''}" required>
        </div>
        <div class="form-group">
          <label>Биография</label>
          <textarea id="edit-bio" placeholder="Расскажите о себе">${userData.bio || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Аватар (URL)</label>
          <input type="url" id="edit-avatar" value="${userData.avatar || ''}" placeholder="https://example.com/avatar.jpg">
        </div>
        <div class="modal-buttons">
          <button type="submit" class="btn-save">Сохранить</button>
          <button type="button" class="btn-cancel">Отмена</button>
        </div>
      </form>
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  
  const content = modal.querySelector('.modal-content');
  content.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;
  
  const formGroup = modal.querySelectorAll('.form-group');
  formGroup.forEach(group => {
    group.style.cssText = 'margin-bottom: 15px;';
    const label = group.querySelector('label');
    if (label) label.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';
    const input = group.querySelector('input, textarea');
    if (input) input.style.cssText = `
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
    `;
  });
  
  const buttons = modal.querySelector('.modal-buttons');
  buttons.style.cssText = 'display: flex; gap: 10px; margin-top: 20px;';
  
  const saveBtn = modal.querySelector('.btn-save');
  saveBtn.style.cssText = `
    flex: 1;
    padding: 10px;
    background-color: #51cf66;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  `;
  
  const cancelBtn = modal.querySelector('.btn-cancel');
  cancelBtn.style.cssText = `
    flex: 1;
    padding: 10px;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  `;
  
  document.body.appendChild(modal);
  
  // Обработка отправки формы
  const form = modal.querySelector('#profile-edit-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const updates = {
      fullName: document.getElementById('edit-fullname').value,
      bio: document.getElementById('edit-bio').value,
      avatar: document.getElementById('edit-avatar').value
    };
    
    if (window.firebaseAuthManager) {
      const userId = window.firebaseAuthManager.getCurrentUserId();
      if (userId) {
        const result = await window.firebaseAuthManager.updateProfile(userId, updates);
        if (result.success) {
          showSuccessMessage('Профиль обновлен');
          modal.remove();
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          showErrorMessage(result.message);
        }
      }
    }
  });
  
  // Обработка закрытия
  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });
}

function showErrorMessage(message) {
  const oldMessages = document.querySelectorAll('.error-message, .success-message');
  oldMessages.forEach(msg => msg.remove());

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

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

function showSuccessMessage(message) {
  const oldMessages = document.querySelectorAll('.error-message, .success-message');
  oldMessages.forEach(msg => msg.remove());

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

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Добавляем стили анимации если их нет
if (!document.querySelector('style[data-profile-animation]')) {
  const style = document.createElement('style');
  style.setAttribute('data-profile-animation', 'true');
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
