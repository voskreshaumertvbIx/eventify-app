'use client'
import Profile from "@/component/ProfileUser";
import { useUserStore } from "@/redux/store/userStore";
import { useRouter } from "next/navigation";

import React from "react";

const Page = () => {
  const {user} = useUserStore();
  const router = useRouter();
  if(!user){
    router.push('/pages/login')
  }
  return (
    
    <div>
      <Profile />
    </div>
  );
};

export default Page;
