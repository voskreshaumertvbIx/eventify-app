import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "eventify-5b437.firebaseapp.com",
  projectId: "eventify-5b437",
  storageBucket: "eventify-5b437.firebasestorage.app",
  messagingSenderId: "283046974440",
  appId: "1:283046974440:web:d1cae28264d199f12fca5d",
  measurementId: "G-7MY3B29T6Z"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();


