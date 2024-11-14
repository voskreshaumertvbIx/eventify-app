"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppUser } from "@/app/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { editUser } from "../redux/slices/userSlice";
import { Input } from "./reusable/Input";
import { Button } from "./reusable/Button";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const { register, handleSubmit } = useForm<Partial<AppUser>>({
    defaultValues: {
      username: user?.username || "",
      description: user?.description || "",
    },
  });

  const onSubmit: SubmitHandler<Partial<AppUser>> = async (data) => {
    try {
      if (!user || !user.uid) {
        console.error("User ID is undefined");
        return;
      }

      
      const updatedData: Partial<AppUser> = {
        uid: user.uid,
        email: user.email, 
        username: data.username || user.username,
        description: data.description || user.description,
      };

      
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updatedData); 

      dispatch(editUser(updatedData as AppUser));
      console.log("User profile updated");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Input
        type="text"
        placeholder="Username"
        {...register("username", { required: true })}
      />
      <Input
        type="text"
        placeholder="Description"
        {...register("description")}
      />

      <Button type="submit" className="mt-4" variant={"default"} size={"sm"}>
        Save Changes
      </Button>
    </form>
  );
};

export default Profile;
