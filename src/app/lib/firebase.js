
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "eventify-81cae.firebaseapp.com",
  projectId: "eventify-81cae",
  storageBucket: "eventify-81cae.firebasestorage.app",
  messagingSenderId: "907767347713",
  appId: "1:907767347713:web:9141cd5886bc5a57a4de00",
  measurementId: "G-1GDFLX3LC4"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();