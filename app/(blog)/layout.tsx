import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { josefinSans, oswald } from "../fonts";
import { SanityLive } from "@/sanity/lib/live";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section
        className={`max-w-[1440px] min-h-[78vh] mx-auto px-[5%] pt-5 sm:px-[10%] xl:px-[13%] xxl:px-[187px] ${josefinSans.variable} ${oswald.variable}`}
      >
        <Header />
        {children}
        <SanityLive/>
      </section>
      <Footer />
    </>
  );
}
