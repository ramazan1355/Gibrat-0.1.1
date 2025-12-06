// Функциональность уроков

document.addEventListener('DOMContentLoaded', () => {
  setupLessonCards();
  loadLessonProgress();
});

function setupLessonCards() {
  const lessonCards = document.querySelectorAll('.lesson-sq-card');
  
  lessonCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      } else {
        const label = card.querySelector('.card-label')?.textContent || 'Урок';
        alert(`${label} скоро будет доступен!`);
      }
    });
  });
}

function loadLessonProgress() {
  const userData = localStorage.getItem('userData');
  if (!userData) return;

  const user = JSON.parse(userData);
  
  // Если у пользователя есть информация о прогрессе, показываем её
  if (user.lessonsCompleted) {
    console.log('Пройдено уроков:', user.lessonsCompleted);
  }
}

// Добавляем функцию для отслеживания прогресса
async function completeLesson(lessonId) {
  const userId = localStorage.getItem('currentUserId');
  
  if (window.firebaseAuthManager && userId) {
    const userData = window.firebaseAuthManager.getCurrentUserData() || {};
    const completed = userData.lessonsCompleted || [];
    
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      await window.firebaseAuthManager.updateProfile(userId, {
        lessonsCompleted: completed,
        lastLessonDate: new Date().toISOString()
      });
    }
  }
}

// Добавляем глобальный доступ
window.completeLesson = completeLesson;
