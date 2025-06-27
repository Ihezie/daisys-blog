"use client";

import CustomInput from "@/app/components/comments/CustomInput";
import Comment from "./Comment";
import { useOptimistic, useState } from "react";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import { Session } from "next-auth";

const CommentSection = ({
  rawComments,
  postId,
  session,
}: {
  rawComments: Array<COMMENT>;
  postId: string | undefined;
  session: Session | null;
}) => {

  const [comments, setComments] = useState(rawComments);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: COMMENT) => [newComment, ...state]
  );
  const [showReplyInput, setShowReplyInput] = useState<string | false>(false);
  return (
    <section className="mt-20">
      <CustomInput
        addOptimisticComment={addOptimisticComment}
        postId={postId}
        session={session}
        type="comment"
        setComments={setComments}
      />
      {optimisticComments.length === 0 ? (
        <h2 className="text-xl text-center text-black/30 mt-5 border-t border-black/30 pt-5">
          Start the conversation!
        </h2>
      ) : (
        <section className="mt-5 border-t border-black/30 pt-12">
          <header className="flex justify-between items-center">
            <h2
              className="text-xl
          "
            >
              Comments{" "}
              <span className="font-josefin-sans font-semibold bg-secondary pt-1 pb-[2px] rounded-full text-white text-sm align-middle px-2 ml-1">
                {optimisticComments.length}
              </span>
            </h2>
            <div>Most recent</div>
          </header>
          <section className="mt-5">
            {optimisticComments.map((comment) => (
              <Comment
                setShowReplyInput={setShowReplyInput}
                showReplyInput={showReplyInput}
                session={session}
                comment={comment}
                key={comment._id}
              />
            ))}
          </section>
        </section>
      )}
    </section>
  );
};
export default CommentSection;
