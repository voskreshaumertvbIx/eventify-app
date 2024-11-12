
'use client'
import { useTheme } from "./component/ThemeProvider";


export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full dark:bg-black">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
