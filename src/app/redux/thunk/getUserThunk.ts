import { AppUser } from "@/app/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged , User as FirebaseUser } from "firebase/auth";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const auth = getAuth();

  try {
    const user = await new Promise<AppUser | null>((resolve, reject) => {
      onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const user: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          };
          resolve(user);
        } else {
          resolve(null);
        }
      }, reject);
    });

    return user;
  } catch (error) {
    
    console.error("Ошибка получения пользователя:", error);
    return null;
  }
});