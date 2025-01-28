"use client";

import AnimatedHamburger from "./AnimatedHamburger";
import { Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { playwriteIN } from "../fonts";
import DesktopNav from "./DesktopNav";
import Link from "next/link";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <header
      className={`bg-white flex justify-between items-center py-3 px-5 rounded-full relative ${
        isVisible ? "fixed " : ""
      }`}
    >
      <h1 className={`logo ${playwriteIN.className}`}>
        <Link className={playwriteIN.className} href="/">
          Unripe-plantain
        </Link>
      </h1>
      <DesktopNav />
      <div className="flex items-center gap-2">
        <button className="sign-in-btn hidden md:block">
          <Link href="/sign-in">Sign in</Link>
        </button>
        <button
          type="button"
          className="size-[38px] flex items-center justify-center rounded-full hover:bg-bright_pink_(crayola)-800"
        >
          <Search />
        </button>
        <button
          className="size-[38px] flex items-center justify-center rounded-full hover:bg-bright_pink_(crayola)-800 md:hidden"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          <AnimatedHamburger isVisible={isVisible} />
        </button>
      </div>
      <AnimatePresence>{isVisible && <MobileNav />}</AnimatePresence>
    </header>
  );
};
export default Header;
