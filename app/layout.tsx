import type { Metadata } from "next";
import { josefinSans, oswald } from "./fonts";
import "./globals.css";
import { auth } from "@/auth";
import AuthProvider from "./components/AuthProvider";
import { Toaster } from "./components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "Unripe-plantain | %s",
    default: "Unripe-plantain",
  },
  description:
    "A women's lifestyle blog offering insights, ideas, and everyday inspiration—plus the ability to comment, like, and save your favourite posts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} ${oswald.variable} antialiased`}
      >
        <AuthProvider value={{ session }}>{children}</AuthProvider>
        <Toaster className="" />
      </body>
    </html>
  );
}
