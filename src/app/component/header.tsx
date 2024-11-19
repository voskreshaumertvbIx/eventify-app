"use client";
import React, { useState } from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./reusable/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux/hooks/hooks";
import UserMenuModal from "./userMenuModal";


const links = [
  {
    name: 'name1',
    route: ''
  },
  {
    name: 'name2',
    route: ''
  },
  {
    name: 'name3',
    route: ''
  },
  {
    name: 'name4',
    route: ''
  },
  {
    name: 'name5',
    route: ''
  },
]

const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log('clicked')
  };
  return (
    <header className="dark:bg-black dark:text-white flex items-center justify-around">
      <div onClick={()=> router.push('/')} className="cursor-pointer">
        <Logo />
      </div>
      <div className="flex justify-between w-[300px]">
       {links.map((link)=>{
        return <a className="hover:border-b-2 hover:scale-105 h-full border-black dark:border-white" key={link.name} href={link.route}>{link.name}</a>
       })}
      </div>
      <div className="flex items-center relative">
        <ThemeSwitcher className=""></ThemeSwitcher>
        { user ? <div><Image
      src={user.avatar?.url || '/user.png'}
      alt="User avatar"
      width={50} 
      height={50} 
      className="rounded-full cursor-pointer"
      onClick={toggleModal}
    />
    {isModalOpen && <UserMenuModal/>}
    </div>
        : <span><a className="hover:border-b-2" href="/pages/login">Login</a><span> / </span><a className="hover:border-b-2" href="/pages/register">Registration</a></span>
        }
      </div>

    </header>
  );
};

export default Header;
