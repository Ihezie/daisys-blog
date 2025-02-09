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
        <section className="max-w-[1440px] mx-auto px-[5%] pt-5 sm:px-[10%] xl:px-[13%]">
          {children}
        </section>
      </body>
    </html>
  );
}
