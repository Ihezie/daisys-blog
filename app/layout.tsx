import type { Metadata } from "next";
import { josefinSans, oswald } from "./fonts";
import "./globals.css";
import Header from "./componets/Header";

export const metadata: Metadata = {
  title: {
    template: "Daisy | %s",
    default: "Daisy",
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
        className={`${josefinSans.variable} ${oswald.variable} antialiased px-4 pt-10`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
