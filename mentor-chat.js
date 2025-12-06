import { speak, initMouth, mouthClose, askAI } from './avatar.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-messages');
    const inputField = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');
    const mouthEl = document.getElementById('mentor-mouth');

    // Инициализация рта
    initMouth(mouthEl);

    // Функция для создания и добавления сообщения
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);

        // Прокрутка вниз к последнему сообщению
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Асинхронный ответ ментора через AI, с TTS
    async function simulateMentorResponse(userText) {
        // сначала добавим индикатор "печатает..."
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'mentor', 'typing');
        typingDiv.textContent = 'Ментор печатает...';
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            // Попробуем получить ответ от AI (askAI)
            const aiResponse = await askAI(userText);
            typingDiv.remove();
            addMessage(aiResponse, 'mentor');
            // проговорим ответ и анимируем рот
            speak(aiResponse, mouthEl);
        } catch (err) {
            console.error('AI error', err);
            typingDiv.remove();
            const fallback = `Спасибо за вопрос по "${userText.substring(0, 15)}...". Ваш текущий прогресс составляет 85%.`;
            addMessage(fallback, 'mentor');
            speak(fallback, mouthEl);
        }
    }

    // Обработчик отправки сообщения
    function handleSendMessage() {
        const messageText = inputField.value.trim();

        if (messageText !== "") {
            // 1. Добавляем сообщение пользователя
            addMessage(messageText, 'user');

            // 2. Имитируем ответ ментора с AI и TTS
            simulateMentorResponse(messageText);

            // 3. Очищаем поле ввода
            inputField.value = '';
        }
    }

    // 1. Отправка по клику на кнопку
    sendButton.addEventListener('click', handleSendMessage);

    // 2. Отправка по нажатию Enter в поле ввода
    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Установка начальной прокрутки при загрузке
    chatBox.scrollTop = chatBox.scrollHeight;
});