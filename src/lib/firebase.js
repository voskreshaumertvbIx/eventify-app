import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWXtL9c73VxghClUpeKekgIAr7u1e-3Y4",
  authDomain: "eventify-81cae.firebaseapp.com",
  projectId: "eventify-81cae",
  storageBucket: "eventify-81cae.firebasestorage.app",
  messagingSenderId: "907767347713",
  appId: "1:907767347713:web:860c92861b88de15a4de00",
  measurementId: "G-69SVCR8R4R"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();


