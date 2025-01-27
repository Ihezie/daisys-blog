import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./componets/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: "Daisy | %s",
    default: "Daisy",
  },
  description: "A blog where she shares stuff"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} antialiased px-4 pt-10`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
