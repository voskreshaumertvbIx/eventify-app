"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "../ThemeProvider";
import { store } from "../../redux/store/store";
import { useUserStore } from "@/redux/store/userStore";


const Providers = ({ children }: { children: React.ReactNode }) => {
  const { user, isInitialized } = useUserStore(); 
  const router = useRouter();
  const pathname = usePathname(); 
  

  useEffect(() => {
    
    if (isInitialized && !user && pathname.startsWith("/dashboard")) {
      router.replace("/auth/login"); 
    }
  }, [user, isInitialized, pathname, router]);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
