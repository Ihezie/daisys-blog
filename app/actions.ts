"use server"
import { signIn, auth, signOut } from "@/auth";

export const signInAction = async () => {
  // "use server";
  await signIn("google");
};

export const signOutAction = async () => {
  await signOut()
}