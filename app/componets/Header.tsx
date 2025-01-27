"use client";

import { AlignJustify } from "lucide-react";
import { Search } from "lucide-react";
import Navbar from "./Navbar";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Playwrite_IN } from "next/font/google";

const playwriteIN = Playwrite_IN({
  weight: "400",
});

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <header
      className={`bg-white flex justify-between py-3 px-5 rounded-full relative ${
        isVisible ? "fixed " : ""
      }`}
    >
      <h1 className={`logo ${playwriteIN.className}`}>
        Unripe-plantain
      </h1>
      <div className="flex text-center gap-3">
        <button type="button">
          <Search />
        </button>
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          <AlignJustify />
        </button>
      </div>
      <AnimatePresence>{isVisible && <Navbar />}</AnimatePresence>
    </header>
  );
};
export default Header;
