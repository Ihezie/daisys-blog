"use server";
import { signIn, auth, signOut } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import type { PortableTextBlock } from "@portabletext/editor";
import { internalGroqTypeReferenceTo } from "@/sanity.types";
import { REPLIES_QUERY } from "@/sanity/lib/queries";
import { REPLIES_QUERYResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";

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
      likes: [],
      dislikes: [],
    });
  }
};

export const likeCommentAction = async (
  documentId: string,
  likes: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "user";
  }> | null,
  dislikes: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "user";
  }> | null
) => {
  const ref = (await auth())?.id;
  const hasLiked = likes?.some((user) => user._ref === ref);
  const hasDisliked = dislikes?.some((user) => user._ref === ref);

  if (hasDisliked) {
    await writeClient
      .patch(documentId)
      .unset([`dislikes[_ref=="${ref}"]`])
      .commit();
  }
  if (!hasLiked) {
    await writeClient
      .patch(documentId)
      .setIfMissing({ likes: [] })
      .insert("after", "likes[-1]", [
        {
          _type: "reference",
          _ref: ref,
        },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      });
  } else {
    await writeClient
      .patch(documentId)
      .unset([`likes[_ref=="${ref}"]`])
      .commit();
  }
};
export const dislikeCommentAction = async (
  documentId: string,
  likes: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "user";
  }> | null,
  dislikes: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "user";
  }> | null
) => {
  const ref = (await auth())?.id;
  const hasLiked = likes?.some((user) => user._ref === ref);
  const hasDisliked = dislikes?.some((user) => user._ref === ref);
  if (hasLiked) {
    await writeClient
      .patch(documentId)
      .unset([`likes[_ref=="${ref}"]`])
      .commit();
  }
  if (!hasDisliked) {
    await writeClient
      .patch(documentId)
      .setIfMissing({ dislikes: [] })
      .insert("after", "dislikes[-1]", [
        {
          _type: "reference",
          _ref: ref,
        },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      });
  } else {
    await writeClient
      .patch(documentId)
      .unset([`dislikes[_ref=="${ref}"]`])
      .commit();
  }
};

export const deleteCommentAction = async (id: string) => {
  await writeClient.delete(id);
};

export const getRepliesAction = async (
  commentId: string
): Promise<REPLIES_QUERYResult> => {
  const replies = await sanityFetch({
    query: REPLIES_QUERY,
    params: { commentId },
  });

  return replies.data;
};

// writeClient.delete({query: '*[_type == "comment"]'})
