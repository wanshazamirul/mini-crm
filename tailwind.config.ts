import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sfdc: {
          blue: {
            50: '#E5F3FA',
            100: '#CCE8F5',
            200: '#99D1EB',
            300: '#66B9E1',
            400: '#33A1D7',
            500: '#00A1E0',
            600: '#0070D2',
            700: '#005FB2',
            800: '#032D60',
            900: '#022145',
          }
        }
      }
    },
  },
};
export default config;
