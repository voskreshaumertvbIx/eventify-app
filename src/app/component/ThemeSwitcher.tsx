import React from "react";
import { useTheme } from "./ThemeProvider";

export type ThemeSwitcher = {
  className: string
}

const ThemeSwitcher:React.FC<ThemeSwitcher> = ({className}) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className={`flex items-center  p-4 ${className}`}>
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-8 flex items-center rounded-full ${
          theme === 'dark' ? "bg-gray-800" : "bg-gray-500"
        } transition-all duration-500`}
      >
        <div
          className={`absolute w-6 h-6 rounded-full bg-white shadow-md transform ${
            theme === 'dark' ? "translate-x-7" : "translate-x-1"
          } transition-transform duration-300`}
        />
        <span
          className={`absolute text-xs ${
             theme === 'dark' ?"text-yellow-400 right-2" : "text-gray-700 left-2"
          }`}
        >
          { theme === 'dark' ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
