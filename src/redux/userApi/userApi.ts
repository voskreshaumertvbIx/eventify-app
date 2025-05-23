import { auth, db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppUser, Registerform } from "@/interfaces";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUserStore } from "../store/userStore";
import Cookies from "js-cookie";
import { FirebaseError } from "firebase/app";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AppUser, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          // Аутентификация пользователя через Firebase
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;

          // Получение данных пользователя из Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = { ...user, ...userDoc.data() } as AppUser;

            // Сохранение пользователя в Zustand
            useUserStore.getState().setUser(userData);
            useUserStore.getState().setInitialized(true);

            // Сохранение токена в куки
            const accessToken = await user.getIdToken();
            Cookies.set("accessToken", accessToken, {
              
              sameSite: "strict",
              expires: 1,
            });

            return { data: userData };
          } else {
            return {
              error: {
                status: 404,
                data: {
                  message: "User document not found",
                  code: "USER_NOT_FOUND",
                },
              },
            };
          }
        } catch (error) {
          let errorMessage = "An unknown error occurred";
          if (error instanceof FirebaseError) {
            switch (error.code) {
              case "auth/user-not-found":
                errorMessage = "User not found";
                break;
              case "auth/wrong-password":
                errorMessage = "Incorrect password";
                break;
              default:
                errorMessage = error.message;
            }
          }
          return {
            error: {
              status: 500,
              data: {
                message: errorMessage,
                code: "LOGIN_ERROR",
              },
            },
          };
        }
      },
    }),
    registration: builder.mutation<AppUser | null, Registerform>({
      async queryFn(data) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password,
          );
          const user = userCredential.user;

          const userData: AppUser = {
            uid: user.uid,
            email: user.email || "",
            username: data.username,
            description: "",
            avatar: { file: "", url: "" },
            name: "",
            surname: "",
            address: "",
            age: null,
          };

          await setDoc(doc(db, "users", user.uid), userData);

          return { data: userData };
        } catch (error) {
          const errorMessage =
            (error as Error).message || "An unknown error occurred";
          return { error: { status: 500, data: errorMessage } };
        }
      },
    }),

    updateUser: builder.mutation<
      AppUser,
      { uid: string; data: Partial<AppUser> }
    >({
      async queryFn({ uid, data }) {
        try {
          const userRef = doc(db, "users", uid);
          await updateDoc(userRef, data);

          const updatedUserDoc = await getDoc(userRef);
          if (!updatedUserDoc.exists()) {
            throw new Error("User not found after update");
          }
          const updatedUser = updatedUserDoc.data() as AppUser;

          return { data: updatedUser };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    deleteUser: builder.mutation<void, string>({
      async queryFn(uid) {
        try {
          const userRef = doc(db, "users", uid);
          await deleteDoc(userRef);

          return { data: undefined };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { statusbar: 500, data: error.message } };
        }
      },
    }),

    logout: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(_, { cacheEntryRemoved }) {
        try {
          auth.signOut();
          localStorage.clear();
          useUserStore.getState().setUser(null);

          await cacheEntryRemoved;
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
} = userApi;
