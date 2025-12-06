// Функциональность чата с ментором

document.addEventListener('DOMContentLoaded', () => {
  setupChatFunctionality();
});

function setupChatFunctionality() {
  const sendBtn = document.getElementById('send-btn');
  const messageInput = document.querySelector('.message-input');
  const chatMessages = document.getElementById('chat-messages');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      sendMessage(messageInput, chatMessages);
    });
  }

  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage(messageInput, chatMessages);
      }
    });
  }

  // Загружаем сохраненные сообщения
  loadChatHistory();
}

function sendMessage(input, container) {
  if (!input || !input.value.trim()) return;

  const messageText = input.value.trim();

  // Добавляем сообщение пользователя
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = messageText;
  userMessage.style.cssText = `
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    max-width: 70%;
    margin: 10px 0;
  `;
  container.appendChild(userMessage);

  // Сохраняем в localStorage
  saveChatMessage('user', messageText);

  // Очищаем поле ввода
  input.value = '';

  // Имитируем ответ ментора
  setTimeout(() => {
    const mentorResponse = generateMentorResponse(messageText);
    const mentorMessage = document.createElement('div');
    mentorMessage.className = 'message mentor';
    mentorMessage.textContent = mentorResponse;
    mentorMessage.style.cssText = `
      align-self: flex-start;
      background-color: #e9ecef;
      color: #333;
      padding: 10px 15px;
      border-radius: 10px;
      max-width: 70%;
      margin: 10px 0;
    `;
    container.appendChild(mentorMessage);

    // Сохраняем ответ ментора
    saveChatMessage('mentor', mentorResponse);
  }, 500);

  // Скролл вниз
  container.scrollTop = container.scrollHeight;
}

function generateMentorResponse(userMessage) {
  const responses = [
    'Хороший вопрос! Расскажу тебе подробнее...',
    'Это очень интересно! Давай разберемся вместе',
    'Отличное наблюдение! Вот мой совет...',
    'Я помогу тебе разобраться в этом',
    'Это важная тема. Слушай внимательно...',
    'Спасибо за вопрос! Вот решение...',
    'Продолжай так же! Ты на правильном пути'
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

function saveChatMessage(author, message) {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  chatHistory.push({
    author: author,
    message: message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function loadChatHistory() {
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  const container = document.getElementById('chat-messages');

  if (!container) return;

  // Не загружаем если уже есть сообщения (кроме приветствия)
  const existingMessages = container.querySelectorAll('.message:not(:first-child)');
  if (existingMessages.length > 0) return;

  // Загружаем историю
  chatHistory.forEach(item => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${item.author}`;
    messageDiv.textContent = item.message;
    messageDiv.style.cssText = `
      ${item.author === 'user' ? 
        'align-self: flex-end; background-color: #007bff; color: white;' :
        'align-self: flex-start; background-color: #e9ecef; color: #333;'
      }
      padding: 10px 15px;
      border-radius: 10px;
      max-width: 70%;
      margin: 10px 0;
    `;
    container.appendChild(messageDiv);
  });
}

// Очистка истории чата
function clearChatHistory() {
  if (confirm('Вы уверены, что хотите очистить историю чата?')) {
    localStorage.removeItem('chatHistory');
    location.reload();
  }
}

// Добавляем глобальный доступ
window.clearChatHistory = clearChatHistory;
