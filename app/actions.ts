"use server";
import { signIn, auth, signOut } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import type { PortableTextBlock } from "@portabletext/editor";
import { internalGroqTypeReferenceTo } from "@/sanity.types";

export const signInAction = async () => {
  // "use server";
  await signIn("google");
};
export const signOutAction = async () => {
  await signOut();
};
export const postComment = async (
  value: Array<PortableTextBlock> | undefined,
  postId: string | undefined,
  commentId: string
) => {
  if (value) {
    await writeClient.create({
      _id: commentId,
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
export const postReply = async (
  value: Array<PortableTextBlock> | undefined,
  postId: string | undefined,
  commentId: string | undefined,
  replyId: string
) => {
  if (value) {
    await writeClient.create({
      _id: replyId,
      _type: "reply",
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
      comment: {
        _type: "reference",
        _ref: commentId,
      },
    });
  }
};
export const likeCommentAction = async (
  documentId: string,
  hasLiked: boolean,
  hasDisliked: boolean
) => {
  const ref = (await auth())?.id;
  let patchedComment;
  if (hasDisliked) {
    await writeClient
      .patch(documentId)
      .unset([`dislikes[_ref=="${ref}"]`])
      .commit();
  }
  if (!hasLiked) {
    patchedComment = await writeClient
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
    patchedComment = await writeClient
      .patch(documentId)
      .unset([`likes[_ref=="${ref}"]`])
      .commit();
  }

  return patchedComment;
};
export const dislikeCommentAction = async (
  documentId: string,
  hasDisliked: boolean,
  hasLiked: boolean
) => {
  const ref = (await auth())?.id;
  let patchedComment;
  if (hasLiked) {
    await writeClient
      .patch(documentId)
      .unset([`likes[_ref=="${ref}"]`])
      .commit();
  }
  if (!hasDisliked) {
    patchedComment = await writeClient
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
    patchedComment = await writeClient
      .patch(documentId)
      .unset([`dislikes[_ref=="${ref}"]`])
      .commit();
  }
  return patchedComment;
};
export const deleteCommentAction = async (id: string) => {
  await writeClient.delete(id);
};
// writeClient.delete({query: '*[_type == "comment"]'})
