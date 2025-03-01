"use server"
import { signIn } from "@/auth";

export const signInAction = async () => {
  "use server";
  await signIn("google");
};
