import { signOutAction } from "../actions";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <form action={signOutAction}>
      <button type="submit" className="flex gap-2 items-center custom-transition hover:text-secondary-400 text-sm border-[1.5px] px-3 py-1 rounded-full font-semibold border-black hover:border-secondary-400">
        Sign Out <LogOut size={17}/>
      </button>
    </form>
  );
};
export default SignOut;
