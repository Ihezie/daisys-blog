import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-yellow-400",
    "bg-green-500",
    "bg-blue-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-orange-400",
  ],
  theme: {
    extend: {
      fontFamily: {
        "font-oswald": "fon",
      },
      screens: {
        xs: "450px",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, 280px)",
        "auto-fit": "repeat(auto-fit, minmax(280px, 1fr))",
      },
      colors: {
        background: "#efefef",
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
        shadcn_background: "hsl(var(--background))",
        shadcn_secondary: {
          "100": "#400614",
          "200": "#800b28",
          "300": "#bf113c",
          "400": "#ec295a",
          "500": "#f26a8d",
          "600": "#f587a2",
          "700": "#f7a5b9",
          "800": "#fac3d1",
          "900": "#fce1e8",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        ou_crimson: {
          "100": "#1b0306",
          "200": "#36050c",
          "300": "#510811",
          "400": "#6c0a17",
          "500": "#880d1e",
          "600": "#ca132b",
          "700": "#ed3850",
          "800": "#f37a8b",
          "900": "#f9bdc5",
          DEFAULT: "#880d1e",
        },
        amaranth_pink: {
          "100": "#48081e",
          "200": "#8f103c",
          "300": "#d7185b",
          "400": "#ec5288",
          "500": "#f49cbb",
          "600": "#f6aec7",
          "700": "#f8c2d5",
          "800": "#fbd7e3",
          "900": "#fdebf1",
          DEFAULT: "#f49cbb",
        },
        light_cyan: {
          "100": "#114148",
          "200": "#228390",
          "300": "#3abfd1",
          "400": "#81d6e2",
          "500": "#cbeef3",
          "600": "#d4f1f5",
          "700": "#dff5f7",
          "800": "#eaf8fa",
          "900": "#f4fcfc",
          DEFAULT: "#cbeef3",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;