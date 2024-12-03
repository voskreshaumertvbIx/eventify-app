import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "eventify-ae871.firebaseapp.com",
  projectId: "eventify-ae871",
  storageBucket: "eventify-ae871.firebasestorage.app",
  messagingSenderId: "117383132579",
  appId: "1:117383132579:web:59ea833f965d3fc31d1616",
  measurementId: "G-B81P1ZC3Q7",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
