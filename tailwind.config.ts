import type { Config } from "tailwindcss";

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
  plugins: [],
  darkMode: "class",
} satisfies Config;
