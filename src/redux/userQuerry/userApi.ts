import { auth, db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppUser, Registerform } from "@/interfaces";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUserStore } from "../store/userStore";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<
      AppUser | null,
      { email: string; password: string }
    >({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;

          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = { ...user, ...userDoc.data() } as AppUser;
            useUserStore.getState().setUser(userData);
            return { data: userData };
          } else {
            return { error: { status: 404, data: "User document not found" } };
          }
        } catch (error) {
          const errorMessage =
            (error as Error).message || "An unknown error occurred";
          return { error: { status: 500, data: errorMessage } };
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

    updateUser: builder.mutation<void, { uid: string; data: Partial<AppUser> }>(
      {
        async queryFn({ uid, data }) {
          try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, data);
            return { data: undefined };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            return { error: { status: 500, data: error.message } };
          }
        },
      },
    ),

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

    logout: builder.mutation<void, void>({
      async queryFn() {
        try {
          await auth.signOut();
          localStorage.clear();
          useUserStore.getState().setUser(null);
          return { data: undefined };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
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
