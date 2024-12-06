"use client";

import React from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "../reusable/Logo";
import { useRouter } from "next/navigation";

import { LoginForm } from "@/interfaces";
import { useLoginMutation } from "@/redux/userQuerry/userApi";



const Login = () => {
  
  const { replace } = useRouter();
  const [login] = useLoginMutation();
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const user = await login(data);
     
      if (user) {
        console.log("Login successful with full user data:", user);
        replace("/dashboard/userprofile");
      } else {
        console.error("User not found in Firestore");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  

  return (
    <div className="flex h-[87vh] w-full shadow-lg">
      <form
        autoComplete="off"
        style={{
          boxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          WebkitBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
          MozBoxShadow: "15px 13px 44px 15px rgba(99,0,191,1)",
        }}
        onSubmit={handleSubmit(submit)}
        noValidate
        className="mx-auto mt-[10%] h-[50%] w-[450px] rounded-xl border-black p-2 dark:border-white"
      >
        <div className="flex h-full flex-col items-center">
          <Logo />
          <p className="m-2">Your Gateway to Unforgettable Events</p>

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
