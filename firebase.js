import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getAuth } from "firebase/auth"; // If using Authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgLmlS91sNV7pR_OyT0Fv2Ooxdf-E0sQA",
  authDomain: "newsapp-a6fab.firebaseapp.com",
  projectId: "newsapp-a6fab",
  storageBucket: "newsapp-a6fab.appspot.com",
  messagingSenderId: "172741193492",
  appId: "1:172741193492:android:e00ce60cb42c4990141c01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (if needed)
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
