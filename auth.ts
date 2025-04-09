import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { writeClient } from "./sanity/lib/write-client";
import { client } from "./sanity/lib/client";
import { USER_BY_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(USER_BY_ID_QUERY, {
          id: profile?.sub,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "user",
          id: profile?.sub,
          name,
          email,
          avatar: image,
        });
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(USER_BY_ID_QUERY, {
            id: profile?.sub,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
