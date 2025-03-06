import { auth } from "@/auth";
import SignIn from "../SignIn";
import Image from "next/image";

const UserDetails = async () => {
  const session = await auth();
  if (!session?.user)
    return <SignIn className="sign-in-btn hidden w-28 md:block" />;

  return (
    <div>
      <div className="size-8 rounded-full overflow-hidden relative">
        <Image
          src={session.user.image || ""}
          alt="User Avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};
export default UserDetails;
