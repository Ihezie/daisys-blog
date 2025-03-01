import { signInAction } from "../actions";
const SignIn = ({ className }: { className: string }) => {
  return (
    <form action={signInAction}>
      <button className={`${className} sign-in-btn`}>Sign in</button>
    </form>
  );
};
export default SignIn;
