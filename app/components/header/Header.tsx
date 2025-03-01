"use client";

import AnimatedHamburger from "./AnimatedHamburger";
import { Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import DesktopNav from "./DesktopNav";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SignIn from "../SignIn";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <header
        className={`bg-white flex justify-between items-end py-3 px-5 sticky transition-none ${
          isVisible ? "" : "border border-background"
        } top-5 rounded-full z-50 md:items-center`}
      >
        <Link href="/">
          <Image
             priority
            src="/unripe-plantain.svg"
            width={122}
            height={26}
            className="w-40"
            alt="unripe-plantain-logo"
          />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <SignIn className="sign-in-btn hidden w-28 md:block" />
          {/* {pathName !== "/posts" && (
            <button
              type="button"
              className="size-[38px] custom-transition flex items-center justify-center rounded-full hover:bg-secondary-800"
            >
              <Search />
            </button>
          )} */}
          <button
            className="size-[38px] flex items-center custom-transition justify-center rounded-full hover:bg-secondary-800 md:hidden"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            <AnimatedHamburger isVisible={isVisible} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isVisible && <MobileNav setIsVisible={setIsVisible} />}
      </AnimatePresence>
    </>
  );
};
export default Header;
