import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || atob("QUl6YVN5Q3UwbUJYNkZEZXE1VHhUMEtjQU1weFFKaHZNcC1aMkFn"),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tpperezdario.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tpperezdario",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tpperezdario.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1091719990057",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1091719990057:web:ab0e6e5d079fdb93df4538"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
