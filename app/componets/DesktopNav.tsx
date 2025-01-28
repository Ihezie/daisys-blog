import { links } from "../data";
import Link from "next/link";
import { oswald } from "../fonts";

const DesktopNav = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        {links.map(({ text, link }) => {
          return (
            <li
              key={text}
              className={`font-medium ${oswald.className} uppercase`}
            >
              <Link
                className="w-full h-full block hover:text-bright_pink_(crayola)"
                href={link}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default DesktopNav;
