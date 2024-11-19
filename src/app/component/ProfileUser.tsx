"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppUser } from "@/app/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { editUser } from "../redux/slices/userSlice";
import { Input } from "./reusable/Input";
import { Button } from "./reusable/Button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);

  const [avatar, setAvatar] = useState({
    url: user?.avatar?.url || "",
    file: user?.avatar?.file || "",
  });

  useEffect(() => {
    if (user?.avatar?.url && user?.avatar?.file) {
      setAvatar({
        url: user.avatar.url,
        file: user.avatar.file,
      });
    }
  }, [user?.avatar]);

  const { register, handleSubmit } = useForm<Partial<AppUser>>({
    defaultValues: {
      username: user?.username || "",
      description: user?.description || "",
      name: user?.name,
      surname: user?.surname,
      address: user?.address,
      age: user?.age,
      avatar: {
        url: avatar.url || user?.avatar?.url || "",
        file: avatar.file || user?.avatar?.file || "",
      },
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
        name: data.name || user.name,
        surname: data.surname || user.surname,
        address: data.address || user.address,
        age: data.age || user.age,
        avatar: {
          url: avatar.url || user?.avatar?.url || "",
          file: avatar.file || user?.avatar?.file || "",
        },
      };

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, updatedData);

      dispatch(editUser(updatedData as AppUser));
      console.log("User profile updated", updatedData);

      setEdit(false); // Disable edit mode after saving changes
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    const uploadedFile = result.info.public_id;

    setAvatar({ url: uploadedUrl, file: uploadedFile });
    console.log("Uploaded image:", { url: uploadedUrl, file: uploadedFile });
  };

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
  };

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
          <Button
            type="submit"
            className="mt-4"
            variant="default"
            size="sm"
          >
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
          Edit
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
        <p>File ID: {avatar.file}</p>
      </div>
    </div>
  );
};

export default Profile;
