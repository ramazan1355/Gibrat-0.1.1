// Система аутентификации Firebase для приложения GIBRAT

import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

class FirebaseAuthManager {
  constructor() {
    this.currentUser = null;
    this.userCollection = collection(db, 'users');
    this.initAuthListener();
  }

  // Слушатель состояния аутентификации
  initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        // Сохраняем информацию о текущем пользователе в localStorage
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('currentUserId', user.uid);
        localStorage.setItem('currentUserEmail', user.email);
        
        // Загружаем данные пользователя из Firestore
        await this.loadUserProfile(user.uid);
      } else {
        this.currentUser = null;
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('userData');
      }
    });
  }

  // Регистрация нового пользователя
  async register(fullName, email, password, confirmPassword) {
    try {
      // Валидация
      if (!fullName || fullName.trim().length === 0) {
        return { success: false, message: 'Требуется полное имя' };
      }

      if (!this.validateEmail(email)) {
        return { success: false, message: 'Невалидный формат почты' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Пароль должен быть минимум 6 символов' };
      }

      if (password !== confirmPassword) {
        return { success: false, message: 'Пароли не совпадают' };
      }

      // Создание пользователя в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Сохранение профиля пользователя в Firestore
      const userData = {
        uid: user.uid,
        fullName: fullName,
        email: email,
        registrationTime: new Date().toISOString(),
        theme: 'light',
        avatar: '',
        bio: '',
        courses: [],
        level: 'beginner'
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Сохранение в localStorage
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('currentUserId', user.uid);
      localStorage.setItem('userData', JSON.stringify(userData));

      return { success: true, message: 'Регистрация успешна' };
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { success: false, message: this.getErrorMessage(error) };
    }
  }

  // Вход пользователя
  async login(email, password) {
    try {
      // Валидация
      if (!this.validateEmail(email)) {
        return { success: false, message: 'Невалидный формат почты' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Пароль должен быть минимум 6 символов' };
      }

      // Вход в Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Загрузка профиля пользователя
      await this.loadUserProfile(user.uid);

      return { success: true, message: 'Вход выполнен успешно' };
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false, message: this.getErrorMessage(error) };
    }
  }

  // Загрузка профиля пользователя
  async loadUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('userData', JSON.stringify(userData));
        return userData;
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
    return null;
  }

  // Выход пользователя
  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userData');
      localStorage.removeItem('currentUserId');
      return { success: true, message: 'Вы вышли из системы' };
    } catch (error) {
      console.error('Ошибка выхода:', error);
      return { success: false, message: 'Ошибка при выходе' };
    }
  }

  // Обновление профиля пользователя
  async updateProfile(uid, updates) {
    try {
      await updateDoc(doc(db, 'users', uid), updates);
      
      // Обновление в localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedData = { ...userData, ...updates };
      localStorage.setItem('userData', JSON.stringify(updatedData));
      
      return { success: true, message: 'Профиль обновлен' };
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      return { success: false, message: 'Ошибка обновления профиля' };
    }
  }

  // Получение текущего пользователя
  getCurrentUser() {
    return this.currentUser;
  }

  // Получение данных текущего пользователя
  getCurrentUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Проверка формата email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Преобразование ошибок Firebase в понятные сообщения
  getErrorMessage(error) {
    const errorCode = error.code;
    const messages = {
      'auth/email-already-in-use': 'Этот email уже зарегистрирован',
      'auth/weak-password': 'Пароль должен быть длиннее',
      'auth/invalid-email': 'Невалидный email',
      'auth/user-not-found': 'Пользователь не найден',
      'auth/wrong-password': 'Неправильный пароль',
      'auth/too-many-requests': 'Слишком много попыток входа. Попробуйте позже',
      'auth/operation-not-allowed': 'Операция недоступна'
    };
    return messages[errorCode] || 'Произошла ошибка';
  }

  // Проверка, авторизован ли пользователь
  isLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
  }

  // Получение ID текущего пользователя
  getCurrentUserId() {
    return localStorage.getItem('currentUserId');
  }
}

// Экспортирование менеджера
export const firebaseAuthManager = new FirebaseAuthManager();

// Глобальный доступ
window.firebaseAuthManager = firebaseAuthManager;
