"use client";
import React, { useState } from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./reusable/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

import UserMenuModal from "./userMenuModal";
import { FaPlus } from "react-icons/fa";

import { useUserStore } from "../redux/store/userStore";
import Link from "next/link";

const links = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "name2",
    route: "",
  },
  {
    name: "name3",
    route: "",
  },
  {
    name: "name4",
    route: "",
  },
  {
    name: "name5",
    route: "",
  },
];

const Header = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log("clicked");
  };
  const navigateToCreateEvent = () => {
    router.push("/dashboard/createevents");
  };
  return (
    <header className="flex items-center justify-around dark:bg-black dark:text-white">
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <Logo />
      </div>
      <div className="flex w-[300px] justify-between">
        {links.map((link) => {
          return (
            <Link
              className="h-full border-black hover:scale-105 hover:border-b-2 dark:border-white"
              key={link.name}
              href={link.route}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="relative flex items-center">
        <ThemeSwitcher className=""></ThemeSwitcher>
        {user && (
          <div
            onClick={navigateToCreateEvent}
            className="mr-2 flex cursor-pointer items-center"
          >
            <FaPlus className="h-[20px] w-[20px]" />
            <p>Create an event</p>
          </div>
        )}
        {user ? (
          <div>
            <Image
              src={user.avatar?.url || "/user.png"}
              alt="User avatar"
              width={50}
              height={50}
              className="cursor-pointer rounded-full"
              onClick={toggleModal}
            />
            {isModalOpen && <UserMenuModal />}
          </div>
        ) : (
          <span>
            <Link className="hover:border-b-2" href={'/auth/login'}>Login</Link>
            <span> / </span>
            <Link className="hover:border-b-2" href={'/auth/register'}>Registration</Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
