"use client";

import React from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, db } from "@/app/lib/firebase";
import Logo from "../reusable/Logo";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


interface Registerform {
  email:string,
  password:string,
  username:string,
  
}

const Register = () => {
  const { register, handleSubmit, formState, reset } = useForm<Registerform>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    
    },
  });

  const submit: SubmitHandler<Registerform> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: data.email,
        username: data.username,
        description: '' ,
        avatar: '',
      });
      console.log("User registered successfully:", user);
      reset();
    } catch (err) {
      console.log(err, "register error");
    }
  };

  return (
    <div className="w-full h-[87vh] shadow-lg flex">
      <form
        autoComplete="off"
        style={{
          boxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          WebkitBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          MozBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
        }}
        onSubmit={handleSubmit(submit)}
        noValidate
        className="mx-auto mt-[9%] w-[450px] h-[60%] border-black rounded-xl dark:border-white p-2"
      >
        <div className="flex flex-col  items-center h-full">
          <Logo />
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
              required: 'Password required',
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;,.<>?/-]{6,}$/,
                message:
                  "Password must contain at least 1 uppercase letter and 1 digit",
              },
            })}
          />
          <Input
            id="username"
            type="text"
            placeholder="enter username"
            error={formState.errors.username?.message}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            })}
          />

          <Button className="mt-4" variant={"default"} size={"sm"}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
