"use client";

import CustomInput from "@/app/components/comments/CustomInput";
import Comment, { REPLY } from "./Comment";
import { useOptimistic, useState, useRef, useEffect, useMemo } from "react";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import { Session } from "next-auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger2,
  SelectValue,
} from "@/app/components/ui/select";
import { internalGroqTypeReferenceTo } from "@/sanity.types";
export type REACTION = {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key: string;
  [internalGroqTypeReferenceTo]?: "user";
};
interface REACTIONPAYLOAD {
  commentId: string;
  userId: string;
  reaction: REACTION | null;
  hasDisliked?: boolean;
  hasLiked?: boolean;
}
export interface OptimisticCommentActionType {
  type:
    | "ADD COMMENT"
    | "REMOVE COMMENT"
    | "ADD REPLY"
    | "REMOVE REPLY"
    | "ADD LIKE"
    | "REMOVE LIKE"
    | "ADD DISLIKE"
    | "REMOVE DISLIKE";
  payload: COMMENT | REPLY | REACTIONPAYLOAD | string;
}

function optimisticCommentsReducer(
  state: COMMENT[],
  { type, payload }: OptimisticCommentActionType
) {
  switch (type) {
    case "ADD COMMENT":
      return [payload as COMMENT, ...state];
    case "REMOVE COMMENT":
      return state.filter((comment) => comment._id !== payload);
    case "ADD REPLY": {
      const newState = state.map((comment) => {
        if (comment._id === (payload as REPLY)?.comment?._id) {
          const newReplies = [payload as REPLY, ...comment.replies];
          return { ...comment, replies: newReplies };
        }
        return comment;
      });
      return newState;
    }
    case "REMOVE REPLY": {
      const newState = state.map((comment) => {
        const newReplies = comment.replies.filter(
          (reply) => payload !== reply._id
        );
        return { ...comment, replies: newReplies };
      });
      return newState;
    }
    case "ADD LIKE": {
      const newState = state.map((comment) => {
        if (comment._id === (payload as REACTIONPAYLOAD).commentId) {
          return {
            ...comment,
            dislikes: (payload as REACTIONPAYLOAD).hasDisliked
              ? comment?.dislikes?.filter(
                  (dislike) =>
                    dislike._ref !== (payload as REACTIONPAYLOAD).userId
                ) || []
              : comment.dislikes,
            likes: [
              ...(comment.likes || []),
              (payload as REACTIONPAYLOAD).reaction as REACTION,
            ],
          };
        }
        return comment;
      });
      return newState;
    }
    case "REMOVE LIKE": {
      const newState = state.map((comment) => {
        if (comment._id === (payload as REACTIONPAYLOAD).commentId) {
          return {
            ...comment,
            likes:
              comment.likes?.filter(
                (like) => like._ref !== (payload as REACTIONPAYLOAD).userId
              ) || [],
          };
        }
        return comment;
      });
      return newState;
    }
    case "ADD DISLIKE": {
      const newState = state.map((comment) => {
        if (comment._id === (payload as REACTIONPAYLOAD).commentId) {
          return {
            ...comment,
            likes: (payload as REACTIONPAYLOAD).hasLiked
              ? comment?.likes?.filter(
                  (like) => like._ref !== (payload as REACTIONPAYLOAD).userId
                ) || []
              : comment.likes,
            dislikes: [
              ...(comment.dislikes || []),
              (payload as REACTIONPAYLOAD).reaction as REACTION,
            ],
          };
        }
        return comment;
      });
      return newState;
    }
    case "REMOVE DISLIKE": {
      const newState = state.map((comment) => {
        if (comment._id === (payload as REACTIONPAYLOAD).commentId) {
          return {
            ...comment,
            dislikes:
              comment.dislikes?.filter(
                (dislike) =>
                  dislike._ref !== (payload as REACTIONPAYLOAD).userId
              ) || [],
          };
        }
        return comment;
      });
      return newState;
    }
    default:
      console.log("Unexpected action type");
      return state;
  }
}

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
  const [optimisticComments, handleOptimisticComments] = useOptimistic(
    comments,
    optimisticCommentsReducer
  );
  const [showReplyInput, setShowReplyInput] = useState<string | false>(false);

  const [sortingCriteria, setSortingCriteria] = useState<"liked" | "recent">(
    "recent"
  );
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
  }, []);
  const sortedComments = useMemo(() => {
    if (initialRender.current) {
      return optimisticComments;
    }
    if (sortingCriteria === "liked") {
      return [...optimisticComments].sort((a, b) =>
        !a.likes || !b.likes ? 0 : b.likes?.length - a.likes?.length
      );
    } else if (sortingCriteria === "recent") {
      return [...optimisticComments].sort(
        (a, b) =>
          new Date(b.publishedAt || "").getTime() -
          new Date(a.publishedAt || "").getTime()
      );
    }
    return optimisticComments;
  }, [optimisticComments, sortingCriteria]);

  return (
    <section className="mt-20">
      <CustomInput
        handleOptimisticComments={handleOptimisticComments}
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
            <Select
              onValueChange={(value) => {
                setSortingCriteria(value as "liked" | "recent");
              }}
              defaultValue="recent"
            >
              <SelectTrigger2 className="w-[118px] border-none ring-0 shadow-none p-0 self-end focus:text-secondary hover:text-secondary">
                <SelectValue placeholder="" />
              </SelectTrigger2>
              <SelectContent>
                <SelectItem value="liked">Most Liked</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </header>
          <section className="mt-5">
            {sortedComments.map((comment) => (
              <Comment
                setShowReplyInput={setShowReplyInput}
                showReplyInput={showReplyInput}
                session={session}
                comment={comment}
                key={comment._id}
                handleOptimisticComments={handleOptimisticComments}
                setComments={setComments}
              />
            ))}
          </section>
        </section>
      )}
    </section>
  );
};
export default CommentSection;
