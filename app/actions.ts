"use server";
import { signIn, auth, signOut } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import type { PortableTextBlock } from "@portabletext/editor";

export const signInAction = async () => {
  // "use server";
  await signIn("google");
};

export const signOutAction = async () => {
  await signOut();
};

export const postComment = async (
  value: Array<PortableTextBlock> | undefined,
  postId: string | undefined
) => {
  if (value) {
    await writeClient.create({
      _type: "comment",
      publishedAt: new Date().toISOString(),
      user: {
        _type: "reference",
        _ref: (await auth())?.id,
      },
      post: {
        _type: "reference",
        _ref: postId,
      },
      body: value,
      likes: 0,
      dislikes: 0,
    });
  }
};