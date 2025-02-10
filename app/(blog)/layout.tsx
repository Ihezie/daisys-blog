import Header from "../components/header/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="max-w-[1440px] mx-auto px-[5%] pt-5 sm:px-[10%] xl:px-[13%]">
      <Header />
      {children}
    </section>
  );
}
