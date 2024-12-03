"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "../ThemeProvider";
import { store } from "../../redux/store/store";



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
       {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
