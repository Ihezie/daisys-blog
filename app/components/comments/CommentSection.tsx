"use client";

import CommentInput from "@/app/components/comments/CommentInput";
import Comment from "./Comment";
import { useOptimistic } from "react";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import { Session } from "next-auth";
import { comment } from "postcss";

const CommentSection = ({
  rawComments,
  postId,
  session,
}: {
  rawComments: Array<COMMENT>;
  postId: string | undefined;
  session: Session | null;
}) => {
  rawComments = rawComments.map((comment) => {
    comment.sending = false;
    return comment;
  });
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    rawComments,
    //properly type this
    (state, newComment: any) => [newComment, ...state]
  );
  

  return (
    <section className="mt-20">
      <CommentInput
        addOptimisticComment={addOptimisticComment}
        postId={postId}
        session={session}
      />
      <section className="mt-5 border-t border-black/30 pt-12">
        <header className="flex justify-between items-center">
          <h2
            className="text-xl
          "
          >
            Comments{" "}
            <span className="font-josefin-sans font-semibold bg-secondary pt-1 pb-[2px] rounded-full text-white text-sm align-middle px-2 ml-1">
              {rawComments.length}
            </span>
          </h2>
          <div>Most recent</div>
        </header>
        <section className="mt-5">
          {optimisticComments.map((comment) => (
            <Comment session={session} comment={comment} key={comment._id} />
          ))}
        </section>
      </section>
    </section>
  );
};
export default CommentSection;
