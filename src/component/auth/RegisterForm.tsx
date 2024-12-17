"use client"; 

import React from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "../reusable/Logo";
import { Registerform } from "@/interfaces";
import { useRegistrationMutation } from "@/redux/userApi/userApi";




const Register = () => {
const [registration] = useRegistrationMutation();

  const { register, handleSubmit, formState, reset } = useForm<Registerform>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const submit: SubmitHandler<Registerform> = async (data) => {
    try {
      const user = registration(data);
      console.log("User registered successfully:", user);
      reset();
    } catch (err) {
      console.log(err, "register error");
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
        className="mx-auto mt-[9%] h-[60%] w-[450px] rounded-xl border-black p-2 dark:border-white"
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
              required: "Password required",
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
