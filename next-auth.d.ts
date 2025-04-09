import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Custom 'id' property
    } & DefaultSession["user"]; // Extending with default user properties from DefaultSession
  }

  interface JWT {
    id: string;
  }
}
