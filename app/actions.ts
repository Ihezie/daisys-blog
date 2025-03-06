"use server"
import { signIn, auth } from "@/auth";

export const signInAction = async () => {
  "use server";
  await signIn("google");
};