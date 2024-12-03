"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppUser } from "@/interfaces";
import { useUpdateUserMutation } from "../redux/userQuerry/userApi";

import { Input } from "./reusable/Input";
import { Button } from "./reusable/Button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useUserStore } from "../redux/store/userStore";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  const [updateUser] = useUpdateUserMutation();

  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState({
    url: user?.avatar?.url || "",
    file: user?.avatar?.file || "",
  });

  const { register, handleSubmit, reset } = useForm<Partial<AppUser>>({
    defaultValues: {
      username: user?.username || "",
      description: user?.description || "",
      name: user?.name,
      surname: user?.surname,
      address: user?.address,
      age: user?.age,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        description: user.description,
        name: user.name,
        surname: user.surname,
        address: user.address,
        age: user.age,
      });
      setAvatar({
        url: user.avatar?.url || "",
        file: user.avatar?.file || "",
      });
    }
    console.log(user);
  }, [user, reset]);

  const onSubmit: SubmitHandler<Partial<AppUser>> = async (data) => {
    if (!user || !user.uid) {
      console.error("No user or UID found");
      return;
    }

    const updatedData = {
      ...data,
      avatar: {
        url: avatar.url,
        file: avatar.file,
      },
    };

    try {
      await updateUser({ uid: user.uid, data: updatedData }).unwrap();
      console.log("Profile updated:", updatedData);
      setEdit(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    const uploadedFile = result.info.public_id;

    setAvatar({ url: uploadedUrl, file: uploadedFile });
    console.log("Uploaded image:", { url: uploadedUrl, file: uploadedFile });
  };

  const handleEditToggle = () => setEdit((prev) => !prev);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <Input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
          disabled={!edit}
        />
        <Input
          type="text"
          placeholder="Description"
          {...register("description")}
          disabled={!edit}
        />
        <Input
          type="text"
          placeholder="Name"
          {...register("name")}
          disabled={!edit}
        />
        <Input
          type="text"
          placeholder="Surname"
          {...register("surname")}
          disabled={!edit}
        />
        <Input
          type="text"
          placeholder="Address"
          {...register("address")}
          disabled={!edit}
        />
        <Input
          type="number"
          placeholder="Age"
          {...register("age")}
          disabled={!edit}
        />
        <Button type="submit" className="mt-4" variant="default" size="sm">
          Save Changes
        </Button>
      </form>

      <Button
        type="button"
        className="mt-4"
        variant="default"
        size="sm"
        onClick={handleEditToggle}
      >
        {edit ? "Cancel" : "Edit"}
      </Button>

      <CldUploadWidget
        uploadPreset="zuytp4aj"
        onSuccess={(result) => handleImageUpload(result)}
      >
        {({ open }) => (
          <button disabled={!edit} onClick={() => open()} className="mt-4">
            Upload an Image
          </button>
        )}
      </CldUploadWidget>

      <div className="mt-4">
        {avatar.url ? (
          <Image
            src={avatar.url}
            alt="User avatar"
            width={128}
            height={128}
            className="rounded-full"
          />
        ) : (
          <p>No avatar uploaded</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
