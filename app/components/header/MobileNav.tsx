import { motion } from "motion/react";
import { links } from "../../data";
import Link from "next/link";

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
const overlay = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};

const MobileNav = () => {
  return (
    <>
      <motion.nav
        variants={container}
        initial="hide"
        animate="show"
        exit="hide"
        className="fixed z-40 transition-none origin-top h-[230px] w-[90%] top-[38px] rounded-[20px] bg-white pt-16 px-5 sm:w-[80%] md:hidden"
      >
        <ul className="flex flex-col items-center gap-3">
          {links.map(({ text, link }) => {
            return (
              <motion.li
                key={text}
                variants={children}
                className="font-medium uppercase transition-none"
              >
                <Link
                  className="w-full h-full block hover:text-secondary"
                  href={link}
                >
                  {text}
                </Link>
              </motion.li>
            );
          })}
          <motion.li
            variants={children}
            className="font-medium uppercase w-full transition-none"
          >
            <button className="block sign-in-btn w-full h-full">
              <Link href="/sign-in">Sign in</Link>
            </button>
          </motion.li>
        </ul>
      </motion.nav>
      <motion.div
        variants={overlay}
        initial="hide"
        animate="show"
        exit="hide"
        className="z-30 fixed h-screen w-screen top-0 left-0 bg-black/70 backdrop-blur-md md:hidden"
      ></motion.div>
    </>
  );
};
export default MobileNav;
