import { Oswald, Josefin_Sans, Playwrite_IN } from "next/font/google";

export const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const playwriteIN = Playwrite_IN({
  weight: "400",
});