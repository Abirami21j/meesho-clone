import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC60d4VaVbPDYryWimOWHa0-P5mHLZIqRQ",
  authDomain: "the-builders--meesho-clone.firebaseapp.com",
  projectId: "the-builders--meesho-clone",
  storageBucket: "the-builders--meesho-clone.firebasestorage.app",
  messagingSenderId: "606478106499",
  appId: "1:606478106499:web:28b07f126a5ed9130640b6",
  measurementId: "G-RDN09VHF4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
