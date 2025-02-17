import Image from "next/image";
import Link from "next/link";
import { links } from "../data";
import { aboutBlog } from "../data";

const Footer = () => {
  return (
    <footer className="bg-secondary-600 text-white max-w-[1440px] mt-16 mx-auto">
      <section className="px-[5%] pt-5 text-center pb-3 sm:px-[10%] md:flex md:items-center md:justify-between xl:px-[13%]">
        <Image
          priority
          src="/unripe-plantain.svg"
          width={122}
          height={26}
          className="w-48 mx-auto mb-3 md:mb-0 md:mx-0 md:w-52 lg:w-56"
          alt="unripe-plantain-logo"
        />
        <ul className="flex justify-center mb-5 md:mb-0">
          {links.map(({ text, link }) => {
            return (
              <li
                key={text}
                className="font-medium uppercase first:border-r last:border-l px-4 hover:underline"
              >
                <Link
                  className="w-full h-full custom-transition block"
                  href={link}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="space-x-6 md:space-x-3 lg:space-x-6">
          {aboutBlog.socials.map(({ icon, link, name }) => (
            <Link href={link} key={name}>
              <Image
                src={icon}
                width={512}
                height={512}
                color="white"
                className={`inline-block custom-transition hover:scale-75  ${name === "youtube" ? "w-9 md:w-7 lg:w-9" : "w-[26px] md:w-[20px] lg:w-[26px]"}`}
                alt={name}
              />
            </Link>
          ))}
        </div>
      </section>
      <p className="border-t py-[6px] text-center group">
        Coded and designed by
        <span className="inline-block w-2"></span>
        <a href="https://github.com/Ihezie" className="">
          <Image
            src="/github-mark.svg"
            width={240}
            height={240}
            alt="github icon"
            className="w-6 inline-block align-top"
          />{" "}
          <span className="group-hover:underline">Ogbuehi Raymond</span>
        </a>
      </p>
    </footer>
  );
};
export default Footer;
