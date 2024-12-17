import type { Config } from "tailwindcss";
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 

  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#181818",
        },
        text: {
          light: "#000000",
          dark: "#ffffff",
        },
        primary: {
          light: "#3498db",
          dark: "#2980b9",
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
  darkMode: "class",
} satisfies Config;
