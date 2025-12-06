# 🚀 GIBRAT - Быстрый старт

## Что было создано:

### 📁 Основные файлы:
- ✅ `firebase-config.js` - Конфигурация Firebase
- ✅ `firebase-auth.js` - Аутентификация с Firebase
- ✅ `firebase-form-handler.js` - Обработка форм
- ✅ `profile-manager.js` - Управление профилем пользователя
- ✅ `navigation.js` - Навигация между страницами
- ✅ `chat-manager.js` - Функциональность чата
- ✅ `rating-manager.js` - Система рейтинга
- ✅ `lesson-manager.js` - Управление уроками

### 🔐 Функции безопасности:
- ✅ Регистрация новых пользователей (Firebase Auth)
- ✅ Вход в систему (Firebase Auth)
- ✅ Выход из системы (Logout)
- ✅ Защита страниц (требует авторизацию)
- ✅ Сохранение профиля в Firestore
- ✅ Управление сессией через localStorage

## 🎯 Как начать работу:

### 1️⃣ **Откройте файл в браузере или запустите локальный сервер**

**Вариант A - Прямое открытие (простой способ):**
```
Откройте: file:///c:/Users/rivi/Desktop/gibrat/login.html
```

**Вариант B - Локальный сервер (рекомендуется для Firebase):**

**На Windows - дважды кликните:**
```
run-server.bat
```
Потом откройте: `http://localhost:8000/login.html`

**На Mac/Linux:**
```bash
chmod +x run-server.sh
./run-server.sh
```
Потом откройте: `http://localhost:8000/login.html`

### 2️⃣ **Тестирование регистрации**

1. Нажмите "Register here" на странице входа
2. Или откройте: `http://localhost:8000/рег.html`
3. Заполните форму:
   - Имя: `Иван Иванов`
   - Email: `ivan@mail.com`
   - Пароль: `123456`
   - Подтверждение: `123456`
4. Нажмите "sing up"
5. Должны попасть на `home.html`

### 3️⃣ **Проверка данных в Firebase**

1. Откройте: https://console.firebase.google.com
2. Выберите проект: `gibrat-8b273`
3. Перейдите в "Authentication" → должен быть ваш новый пользователь
4. Перейдите в "Firestore Database" → коллекция "users" → ваш документ

### 4️⃣ **Тестирование функций**

**На главной странице (home.html):**
- ✅ Должно отобразиться ваше имя в приветствии
- ✅ Кликайте на вкладки внизу для навигации
- ✅ Активная вкладка подсвечивается

**На странице профиля (проф.html):**
- ✅ Ваше имя и email
- ✅ Кнопка "Выход" в правом углу
- ✅ Кнопка "Редактировать профиль"

**Кнопка "Выход":**
- ✅ Нажимаем → перенаправление на login.html
- ✅ Данные удаляются из localStorage
- ✅ Сессия Firebase закрывается

## 📱 Все страницы:

| Страница | URL | Описание |
|----------|-----|---------|
| Вход | `login.html` | Форма входа в систему |
| Регистрация | `рег.html` | Форма регистрации |
| Главная | `home.html` | Главный экран приложения |
| Профиль | `проф.html` | Профиль пользователя + Выход |
| Курсы | `кур.html` | Меню курсов |
| Уроки | `урок.html` | Страница уроков |
| Рейтинг | `рейтинг.html` | Система рейтинга |
| Чат | `мчат.html` | Чат с ментором |
| Приветствие | `чат.html` | Страница приветствия |

## 🔧 Что дальше можно добавить:

- [ ] Загрузка аватара в Firebase Storage
- [ ] Поиск пользователей
- [ ] Система комментариев
- [ ] Уведомления (push notifications)
- [ ] Темная тема
- [ ] Многоязычность
- [ ] Мобильное приложение (React Native)
- [ ] PWA (Progressive Web App)

## 🐛 Если что-то не работает:

### Проблема: "Модули не загружаются"
**Решение:** Используйте локальный сервер (run-server.bat или run-server.sh), не открывайте file://

### Проблема: "Firebase не инициализируется"
**Решение:** 
1. Проверьте интернет соединение
2. Проверьте, что скрипты загружены (DevTools → Network)
3. Посмотрите консоль ошибок (DevTools → Console)

### Проблема: "Не сохраняются данные в Firestore"
**Решение:**
1. Проверьте Firebase правила (Firestore → Rules)
2. Используйте Chrome DevTools → Network для отладки запросов

### Проблема: "Кнопка Выход не работает"
**Решение:** Убедитесь, что `firebaseAuthManager` загружен (проверьте в консоли)

## 📊 Структура данных в Firestore:

```
Коллекция: users
├── Документ: {userId}
│   ├── uid: "строка с ID"
│   ├── fullName: "Иван Иванов"
│   ├── email: "ivan@mail.com"
│   ├── avatar: "https://..."
│   ├── bio: "Мой текст"
│   ├── theme: "light"
│   ├── courses: ["course1", "course2"]
│   ├── level: "beginner"
│   ├── registrationTime: "2025-12-06T..."
│   └── lessonsCompleted: ["lesson1", "lesson2"]
```

## 🔐 Правила Firestore (важно скопировать):

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 💡 Полезные команды DevTools:

```javascript
// В консоли браузера:

// Проверить авторизацию:
firebaseAuthManager.getCurrentUser()

// Получить данные пользователя:
firebaseAuthManager.getCurrentUserData()

// Получить ID пользователя:
firebaseAuthManager.getCurrentUserId()

// Проверить статус входа:
firebaseAuthManager.isLoggedIn()

// Выход:
firebaseAuthManager.logout()

// Просмотреть localStorage:
localStorage
```

## ✅ Всё готово к использованию!

Запустите `run-server.bat` (Windows) или `run-server.sh` (Mac/Linux) и откройте `http://localhost:8000/login.html`

Начните с регистрации нового аккаунта и тестирования всех функций!

---

**Создано:** 6 декабря 2025
**Версия:** 1.0 (Beta)
**Статус:** ✅ Готово к тестированию
