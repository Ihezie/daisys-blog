import type { Metadata } from "next";
import { josefinSans, oswald } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "Unripe-plantain | %s",
    default: "Unripe-plantain",
  },
  description: "A blog where she shares stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} ${oswald.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
