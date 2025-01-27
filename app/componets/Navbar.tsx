import { motion } from "motion/react";
import { links } from "../data";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const container = {
  hide: {
    transition: {
      duration: 0.4,
    },
    scaleY: 0,
    opacity: [1, 1, 1, 0],
  },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const children = {
  hide: {
    transition: {
      duration: 0.1,
    },
    opacity: 0,
  },
  show: {
    transition: {
      duration: 0.7,
    },
    opacity: 1,
  },
};

const Navbar = () => {
  return (
    <motion.nav
      variants={container}
      initial="hide"
      animate="show"
      exit="hide"
      className={`absolute transition-none origin-top w-full h-[230px] right-0 top-5 rounded-[20px] -z-50 bg-white pt-16 px-5`}
    >
      <ul className="flex flex-col items-center gap-3">
        {links.map(({ text, link }) => {
          return (
            <motion.li
              key={text}
              variants={children}
              className={`font-bold flex gap-3 items-center ${
                text === "Sign in"
                  ? "text-bright_pink_(crayola) py-1 w-full text-center border-2 border-bright_pink_(crayola) rounded-full font-bold hover:bg-bright_pink_(crayola) hover:text-white transition-colors max-w-[370px] mx-auto duration-500"
                  : " capitalize"
              }`}
            >
              {/* {text === "blog" && <Newspaper size={30} />}
              {text === "favourites" && <Heart size={30} />}
              {text === "shop" && <ShoppingBag size={30} />} */}
              <Link className="w-full h-full block" href={link}>
                {text}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
};
export default Navbar;
