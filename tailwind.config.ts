import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            background: {
                light: '#ffffff',
                dark: '#181818',
            },
            text: {
                light: '#000000',
                dark: '#ffffff',
            },
            primary: {
                light: '#3498db',
                dark: '#2980b9',
            }
        },
    },
},
  plugins: [],
  darkMode: 'class', 
} satisfies Config;
