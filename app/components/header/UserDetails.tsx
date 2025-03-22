"use client";

import Avatar from "./Avatar";
import { useState } from "react";
import UserMenu from "./UserMenu";
import SignIn from "../SignIn";
import { useAuthContext } from "../AuthProvider";
const UserDetails = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { session } = useAuthContext();

  if (!session?.user)
    return <SignIn className="sign-in-btn w-[75px] md:w-28 md:block" />;

  return (
    <>
      <div
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <Avatar image={session?.user.image} showMenu={showMenu} />
      </div>
      {showMenu && <UserMenu setShowMenu={setShowMenu} />}
    </>
  );
};
export default UserDetails;

