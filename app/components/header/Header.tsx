"use client";

import AnimatedHamburger from "./AnimatedHamburger";
import { Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import DesktopNav from "./DesktopNav";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <header
        className={`bg-white flex justify-between items-end py-3 px-5 sticky transition-none ${
          isVisible ? "" : "border border-background"
        } top-5 rounded-full z-50 md:items-center`}
      >
        <Link href="/">
          <Image
            src="/unripe-plantain.svg"
            width={122}
            height={26}
            className="w-40"
            alt="unripe-plantain-logo"
          />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <button className="sign-in-btn hidden md:block">
            <Link href="/sign-in">Sign in</Link>
          </button>
          <button
            type="button"
            className="size-[38px] flex items-center justify-center rounded-full hover:bg-secondary-800"
          >
            <Search />
          </button>
          <button
            className="size-[38px] flex items-center justify-center rounded-full hover:bg-secondary-800 md:hidden"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            <AnimatedHamburger isVisible={isVisible} />
          </button>
        </div>
      </header>
      <AnimatePresence>{isVisible && <MobileNav />}</AnimatePresence>
    </>
  );
};
export default Header;
