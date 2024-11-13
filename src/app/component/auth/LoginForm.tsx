"use client";

import React from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useForm, SubmitHandler } from "react-hook-form";

import Logo from "../reusable/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { LoginForm, AppUser } from "@/app/interfaces";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setUser } from "../redux/slices/userSlice";
import { doc, getDoc } from "firebase/firestore";



const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState ,} = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<LoginForm> = async (data) => {
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userFirebase = userCredential.user;
      const userId = userFirebase.uid;

     
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        const user: AppUser = {
          email: userFirebase.email!,
          username: userData.username || "",
          avatar: userData.avatar || { file: "", url: "" },
          description: userData.description || "",
        };

        dispatch(setUser(user));
        console.log("Login successful with full user data");
      } else {
        console.log("User data not found in Firestore");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  

  return (
    <div className="w-full h-[87vh] dark:bg-black text-dark dark:text-white shadow-lg flex">
      <form autoComplete="off"
        style={{
          boxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          WebkitBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          MozBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
        }}
        onSubmit={handleSubmit(submit)}
        noValidate
        className="mx-auto mt-[10%] w-[450px] h-[50%] border-black rounded-xl dark:border-white p-2"
      >
        <div className="flex flex-col  items-center h-full">
          
        <Logo/>
          <p className="m-2 ">Your Gateway to Unforgettable Events</p>

          <Input
            type="email"
            className=""
            placeholder="example@example.com"
            error={formState.errors["email"]?.message}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            id="password"
            type="password"
            placeholder="enter password"
            className=""
            error={formState.errors["password"]?.message}
            {...register("password", {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;,.<>?/-]{6,}$/,
                message:
                  "Password must contain at least 1 uppercase letter and 1 digit",
              },
            })}
          />
          <Button className="mt-4" variant={"default"} size={"sm"}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
