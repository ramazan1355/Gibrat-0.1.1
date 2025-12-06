// Функциональность рейтинга

document.addEventListener('DOMContentLoaded', () => {
  setupRatingFilters();
  loadRatingData();
});

function setupRatingFilters() {
  const filterButtons = document.querySelectorAll('.category-btn, .nav-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Удаляем active класс со всех кнопок
      filterButtons.forEach(b => b.classList.remove('active'));
      
      // Добавляем active к текущей кнопке
      btn.classList.add('active');
      
      // Загружаем данные рейтинга
      loadRatingData();
    });
  });
}

function loadRatingData() {
  // Получаем выбранную категорию
  const activeCategory = document.querySelector('.category-btn.active')?.textContent || 'город';
  
  // Здесь можно загрузить данные с сервера
  // Пока используем демо-данные
  
  console.log('Загрузка рейтинга для:', activeCategory);
}

// Получение рейтинга с сервера (когда будет backend)
async function fetchRatingData(category) {
  try {
    // const response = await fetch(`/api/rating?category=${category}`);
    // const data = await response.json();
    // return data;
    return [];
  } catch (error) {
    console.error('Ошибка загрузки рейтинга:', error);
  }
}

// Добавляем глобальный доступ
window.fetchRatingData = fetchRatingData;
