import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px"
      },
      colors: {
        background: "#f2f2f3",
        secondary: {
          DEFAULT: "#f26a8d",
          100: "#400614",
          200: "#800b28",
          300: "#bf113c",
          400: "#ec295a",
          500: "#f26a8d",
          600: "#f587a2",
          700: "#f7a5b9",
          800: "#fac3d1",
          900: "#fce1e8",
        },
        ou_crimson: {
          DEFAULT: "#880d1e",
          100: "#1b0306",
          200: "#36050c",
          300: "#510811",
          400: "#6c0a17",
          500: "#880d1e",
          600: "#ca132b",
          700: "#ed3850",
          800: "#f37a8b",
          900: "#f9bdc5",
        },
        amaranth_pink: {
          DEFAULT: "#f49cbb",
          100: "#48081e",
          200: "#8f103c",
          300: "#d7185b",
          400: "#ec5288",
          500: "#f49cbb",
          600: "#f6aec7",
          700: "#f8c2d5",
          800: "#fbd7e3",
          900: "#fdebf1",
        },
        light_cyan: {
          DEFAULT: "#cbeef3",
          100: "#114148",
          200: "#228390",
          300: "#3abfd1",
          400: "#81d6e2",
          500: "#cbeef3",
          600: "#d4f1f5",
          700: "#dff5f7",
          800: "#eaf8fa",
          900: "#f4fcfc",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
