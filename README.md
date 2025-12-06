# 🎓 GIBRAT - Образовательная платформа с Firebase

> Полнофункциональное веб-приложение для онлайн-обучения с интеграцией Firebase

## 🌟 Основные возможности

✨ **Аутентификация**
- Регистрация новых пользователей
- Вход в систему через Firebase Auth
- Выход (logout) с очисткой сессии
- Восстановление пароля (готово для добавления)

👤 **Управление профилем**
- Полная информация о пользователе
- Редактирование профиля
- Загрузка аватара (готово)
- Сохранение данных в Firestore

📚 **Функции приложения**
- Главная страница с новостями
- Каталог курсов
- Система уроков с отслеживанием
- Рейтинг студентов
- Чат с ментором в реальном времени
- Страница профиля

🔐 **Безопасность**
- Проверка авторизации на каждой странице
- Защита от несанкционированного доступа
- Валидация данных на клиенте
- Хеширование паролей (Firebase)

## 🚀 Быстрый старт

### 1. Запустить локальный сервер

**Windows:**
```bash
run-server.bat
```

**Mac/Linux:**
```bash
chmod +x run-server.sh
./run-server.sh
```

### 2. Открыть в браузере
```
http://localhost:8000/login.html
```

### 3. Создать тестовый аккаунт
- Email: `test@mail.com`
- Пароль: `123456`
- Имя: `Тестовый пользователь`

## 📁 Структура проекта

```
gibrat/
├── 📄 HTML страницы (9 файлов)
├── 🔧 JavaScript модули (8 файлов)
├── 📚 Документация (5 файлов)
└── 🎨 CSS стили (9 файлов)
```

## 📖 Документация

| Документ | Назначение |
|----------|-----------|
| **QUICK_START.md** | 🚀 Начните отсюда |
| **SETUP_COMPLETE.md** | 📚 Полная документация Firebase |
| **NAVIGATION_DOCS.md** | 🧭 Система навигации |
| **DEVELOPMENT_GUIDE.md** | 🔧 Гайд для разработчиков |
| **CHECKLIST.md** | ✅ Что было сделано |

## 🔌 Firebase интеграция

### Автентификация
```javascript
// Регистрация
await firebaseAuthManager.register(fullName, email, password, confirmPassword);

// Вход
await firebaseAuthManager.login(email, password);

// Выход
await firebaseAuthManager.logout();

// Получить текущего пользователя
const user = firebaseAuthManager.getCurrentUser();

// Обновить профиль
await firebaseAuthManager.updateProfile(userId, {fullName: 'Новое имя'});
```

### Сохранение данных

Все данные пользователя хранятся в Firestore:
```
Коллекция: users
├── Документ: {uid пользователя}
│   ├── fullName: string
│   ├── email: string
│   ├── avatar: string
│   ├── bio: string
│   ├── courses: array
│   └── lessonsCompleted: array
```

## 🎯 Основные файлы

### Firebase
- `firebase-config.js` - Конфигурация
- `firebase-auth.js` - Аутентификация
- `firebase-form-handler.js` - Обработка форм

### Менеджеры
- `profile-manager.js` - Профиль пользователя
- `navigation.js` - Навигация между страницами
- `chat-manager.js` - Чат с ментором
- `rating-manager.js` - Система рейтинга
- `lesson-manager.js` - Управление уроками

## 📱 Все страницы

| Страница | URL | Описание |
|----------|-----|---------|
| 🔐 Вход | `login.html` | Авторизация в систему |
| 📝 Регистрация | `рег.html` | Создание нового аккаунта |
| 🏠 Главная | `home.html` | Главный экран приложения |
| 👤 Профиль | `проф.html` | Профиль пользователя |
| 📚 Курсы | `кур.html` | Каталог курсов |
| 📖 Уроки | `урок.html` | Видео уроки и задания |
| 🏆 Рейтинг | `рейтинг.html` | Рейтинг студентов |
| 💬 Чат | `мчат.html` | Общение с ментором |
| 👋 Приветствие | `чат.html` | Страница приветствия |

## 💡 Примеры использования

### Проверить авторизацию
```javascript
if (navManager.checkLoginStatus()) {
    console.log('Пользователь авторизован');
}
```

### Получить данные пользователя
```javascript
const userData = firebaseAuthManager.getCurrentUserData();
console.log(userData.email);
```

### Отправить сообщение в чат
```javascript
saveChatMessage('user', 'Привет, ментор!');
```

### Отметить урок как пройденный
```javascript
completeLesson('lesson_1');
```

## ⚙️ Требования

- **Browser:** Chrome, Firefox, Safari (свежие версии)
- **Server:** Python 3+ (для локального запуска)
- **Internet:** Требуется для Firebase
- **Firebase:** Проект `gibrat-8b273` (уже настроен)

## 🔐 Безопасность и правила Firestore

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Только сам пользователь может читать и писать свои данные
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 🐛 Решение проблем

### "Модули не загружаются"
→ Используйте локальный сервер (run-server.bat), не открывайте file://

### "Firebase не инициализируется"
→ Проверьте интернет, посмотрите DevTools → Network и Console

### "Не сохраняются данные"
→ Проверьте правила Firestore, откройте Firebase Console → Rules

## 🚀 Развертывание на Production

### Хостинг (Рекомендуется Firebase Hosting)

```bash
# Установить Firebase CLI
npm install -g firebase-tools

# Логин в Firebase
firebase login

# Инициализировать проект
firebase init hosting

# Развернуть
firebase deploy
```

### Переменные окружения

Переместите API ключи в `.env` файл:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
```

## 📊 Планы развития

- [ ] Синхронизация чата в реальном времени
- [ ] Загрузка аватара в Firebase Storage
- [ ] Система уведомлений
- [ ] Темная тема
- [ ] Мобильное приложение
- [ ] PWA (Progressive Web App)
- [ ] Backend для обработки платежей

## 📞 Контакты и поддержка

Для вопросов и проблем:
1. Проверьте документацию (QUICK_START.md)
2. Посмотрите консоль браузера (DevTools → Console)
3. Проверьте Firebase Console (https://console.firebase.google.com)

## 📄 Лицензия

MIT License - используйте свободно в личных и коммерческих проектах

## 🙏 Спасибо за использование GIBRAT!

```
    ╔══════════════════════════════════╗
    ║  🎓 GIBRAT v1.0 Beta            ║
    ║  Готово к использованию ✅      ║
    ║  Последнее обновление: 6.12.2025║
    ╚══════════════════════════════════╝
```

---

**Начните с:** `QUICK_START.md` 📖  
**Технических вопросов:** `DEVELOPMENT_GUIDE.md` 🔧  
**Полная информация:** `SETUP_COMPLETE.md` 📚

**Удачи в развитии GIBRAT! 🚀**
