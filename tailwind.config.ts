import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1F3B2C",
        leaf: "#3C6E47",
        clay: "#B97332",
        sand: "#F4EFE7",
        stone: "#111827"
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

