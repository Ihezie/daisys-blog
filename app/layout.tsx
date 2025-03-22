import type { Metadata } from "next";
import { josefinSans, oswald } from "./fonts";
import "./globals.css";
import { auth } from "@/auth";
import AuthProvider from "./components/AuthProvider";

export const metadata: Metadata = {
  title: {
    template: "Unripe-plantain | %s",
    default: "Unripe-plantain",
  },
  description: "A blog where she shares stuff",
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
      </body>
    </html>
  );
}
