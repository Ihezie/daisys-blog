import { signInAction } from "../actions";
import { useActionState } from "react";
import { ThreeDots } from "react-loader-spinner";

const SignIn = ({ className }: { className: string }) => {
  const [, action, isPending] = useActionState(signInAction, null);

  return (
    <form action={action}>
      <button
        disabled={isPending}
        className={`${className} min-h-[27.5px] sm:min-h-9 sign-in-btn flex items-center justify-center ${isPending ? "bg-secondary" : ""}`}
      >
        {isPending ? (
          <ThreeDots color="white" height={10} width={35} />
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};
export default SignIn;
