import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/lib/firebase"; // Ваши настройки Firebase
import { doc, getDoc } from "firebase/firestore";
import { AppUser } from "@/app/interfaces";

export const fetchUser = createAsyncThunk<AppUser, string>(
  "user/fetchUser",
  async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      console.log(userData)
      return {
        ...userData,
        avatar: userData.avatar || null, 
      } as AppUser;
   
    } else {
      throw new Error("User not found");
    }
  }
);
