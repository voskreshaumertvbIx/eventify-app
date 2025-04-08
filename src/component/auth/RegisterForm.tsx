"use client";

import React from "react";
import { Input } from "../reusable/Input";
import { Button } from "../reusable/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "../reusable/Logo";
import { Registerform } from "@/interfaces";
import { useRegistrationMutation } from "@/redux/userApi/userApi";

const Register = () => {
  const [registration, { isLoading }] = useRegistrationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isDirty },
    reset,
  } = useForm<Registerform>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onChange",
  });

  const showError = submitCount > 0 || isDirty;

  const submit: SubmitHandler<Registerform> = async (data) => {
    try {
      const result = await registration(data).unwrap();
      console.log("User registered successfully:", result);
      reset();
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex h-[87vh] w-full shadow-lg">
      <form
        autoComplete="off"
        className="form-shadow mx-auto mt-[9%] h-[60%] w-[450px] rounded-xl border-black p-2"
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <div className="flex h-full flex-col items-center">
          <Logo />
          <p className="m-2">Your Gateway to Unforgettable Events</p>

          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            aria-label="Email"
            error={showError ? errors.email?.message : undefined}
            {...register("email", {
              required: "Email is required",
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
            aria-label="Password"
            error={showError ? errors.password?.message : undefined}
            {...register("password", {
              required: "Password is required",
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
            aria-label="Username"
            error={showError ? errors.username?.message : undefined}
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

          <Button
            className="mt-4"
            variant={"default"}
            size={"sm"}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
