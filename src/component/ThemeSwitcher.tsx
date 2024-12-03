import React from "react";
import { useTheme } from "./ThemeProvider";

export type ThemeSwitcher = {
  className: string;
};

const ThemeSwitcher: React.FC<ThemeSwitcher> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`flex items-center p-4 ${className}`}>
      <button
        onClick={toggleTheme}
        className={`relative flex h-8 w-14 items-center rounded-full ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-500"
        } transition-all duration-500`}
      >
        <div
          className={`absolute h-6 w-6 transform rounded-full bg-white shadow-md ${
            theme === "dark" ? "translate-x-7" : "translate-x-1"
          } transition-transform duration-300`}
        />
        <span
          className={`absolute text-xs ${
            theme === "dark"
              ? "right-2 text-yellow-400"
              : "left-2 text-gray-700"
          }`}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
