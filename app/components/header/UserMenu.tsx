import { Dispatch } from "react";
import SignOut from "../SignOut";

const UserMenu = ({
  setShowMenu,
  username,
}: {
  setShowMenu: Dispatch<boolean>;
  username: string | null | undefined;
}) => {
  return (
    <>
      <div className="absolute -bottom-[90px] min-w-[200px] right-7 bg-white shadow-[0_4px_10px_#00000050] rounded-2xl px-2 pt-2 pb-3 z-[100] md:right-5">
        <p className="mb-2">Welcome, {username?.split(" ")[0]}</p>
        <SignOut />
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
        }}
        className="fixed left-0 top-0 h-screen w-screen z-[70]"
      ></div>
    </>
  );
};

export default UserMenu;
