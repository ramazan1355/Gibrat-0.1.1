// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdMJLzLztw6Exzht7iPuDDl6K22IZw_IA",
  authDomain: "gibrat-8b273.firebaseapp.com",
  projectId: "gibrat-8b273",
  storageBucket: "gibrat-8b273.firebasestorage.app",
  messagingSenderId: "681679910674",
  appId: "1:681679910674:web:52ed6ec3a71edd611525cb",
  measurementId: "G-DT2D78L1JF"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение сервисов
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
