import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { Session } from "next-auth";
import {
  dislikeCommentAction,
  likeCommentAction,
  deleteCommentAction,
} from "@/app/actions";
import { useState, useOptimistic, useTransition } from "react";
import type { REPLY } from "./Comment";
import { timestamp } from "@/lib/utils";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { COMMENTS_QUERYResult } from "@/sanity.types";
import { uuid } from "@sanity/uuid";
import { uniqueArr } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import type { OptimisticCommentActionType, REACTION } from "./CommentSection";

export function optimisticReactionsReducer(
  state: { likes: REACTION[] | null; dislikes: REACTION[] | null },
  action: {
    type: "ADD LIKE" | "REMOVE LIKE" | "ADD DISLIKE" | "REMOVE DISLIKE";
    payload: {
      id: string;
      reaction: REACTION | null;
      hasDisliked?: boolean;
      hasLiked?: boolean;
    };
  }
) {
  if (!state.likes || !state.dislikes) return state;
  switch (action.type) {
    case "ADD LIKE":
      if (action.payload.hasDisliked) {
        return {
          likes: [...state.likes, action.payload.reaction as REACTION],
          dislikes: state.dislikes.filter(
            (dislike) => dislike._ref !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          likes: [...state.likes, action.payload.reaction as REACTION],
        };
      }
    case "REMOVE LIKE":
      return {
        ...state,
        likes: state.likes.filter((like) => like._ref !== action.payload.id),
      };
    case "ADD DISLIKE":
      if (action.payload.hasLiked) {
        return {
          dislikes: [...state.dislikes, action.payload.reaction as REACTION],
          likes: state.likes.filter((like) => like._ref !== action.payload.id),
        };
      } else {
        return {
          ...state,
          dislikes: [...state.dislikes, action.payload.reaction as REACTION],
        };
      }
    case "REMOVE DISLIKE":
      return {
        ...state,
        dislikes: state.dislikes.filter(
          (dislike) => dislike._ref !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

const Reply = ({
  reply,
  session,
  handleOptimisticComments,
  setComments,
}: {
  reply: REPLY;
  session: Session | null;
  handleOptimisticComments: (action: OptimisticCommentActionType) => void;
  setComments: Dispatch<SetStateAction<[] | COMMENTS_QUERYResult>>;
}) => {
  const ownsReply = session?.id === reply.user?._id;

  const [reactions, setReactions] = useState({
    likes: reply.likes,
    dislikes: reply.dislikes,
  });
  const [optimisticReactions, handleOptimisticReactions] = useOptimistic(
    reactions,
    optimisticReactionsReducer
  );
  const [_, startTransition] = useTransition();

  const handleReaction = (type: "like" | "dislike") => {
    if (!session) {
      toast("Please sign in");
      return;
    }
    const hasLiked = Boolean(
      optimisticReactions.likes?.some((user) => user._ref === session?.id)
    );
    const hasDisliked = Boolean(
      optimisticReactions.dislikes?.some((user) => user._ref === session.id)
    );
    if (type === "like") {
      startTransition(async () => {
        if (hasLiked) {
          handleOptimisticReactions({
            type: "REMOVE LIKE",
            payload: {
              id: session.id,
              reaction: null,
            },
          });
        } else {
          handleOptimisticReactions({
            type: "ADD LIKE",
            payload: {
              id: session.id,
              reaction: {
                _key: uuid(),
                _type: "reference",
                _ref: session.id,
              },
              hasDisliked,
            },
          });
        }
        const updatedComment = await likeCommentAction(
          reply._id,
          hasLiked,
          hasDisliked
        );
        setReactions({
          likes: updatedComment.likes,
          dislikes: updatedComment.dislikes,
        });
      });
    } else {
      startTransition(async () => {
        if (hasDisliked) {
          handleOptimisticReactions({
            type: "REMOVE DISLIKE",
            payload: {
              id: session.id,
              reaction: null,
            },
          });
        } else {
          handleOptimisticReactions({
            type: "ADD DISLIKE",
            payload: {
              id: session.id,
              reaction: {
                _key: uuid(),
                _type: "reference",
                _ref: session.id,
              },
              hasLiked,
            },
          });
        }
        const updatedComment = await dislikeCommentAction(
          reply._id,
          hasDisliked,
          hasLiked
        );
        setReactions({
          likes: updatedComment.likes,
          dislikes: updatedComment.dislikes,
        });
      });
    }
  };
  const deleteReply = (id: string) => {
    startTransition(async () => {
      handleOptimisticComments({
        type: "REMOVE REPLY",
        payload: id,
      });
      await deleteCommentAction(id);
      setComments((prev) => {
        const newState = prev.map((comment) => {
          const newReplies = comment.replies.filter(
            (reply) => id !== reply._id
          );
          return { ...comment, replies: newReplies };
        });
        return newState;
      });
    });
  };

  return (
    <article
      className={reply.sending ? "[&_*]:opacity-50 pointer-events-none" : ""}
    >
      <header className={"flex !opacity-100 items-center gap-3"}>
        <div
          className={`size-[30px] rounded-full overflow-hidden relative border-2 z-[100]"}`}
        >
          <Image
            src={reply?.user?.avatar || "/default-avatar.jpg"}
            alt="User Avatar"
            fill
            sizes="10vw"
          />
        </div>
        <h3>{reply?.user?.name}</h3>
        <span
          className={`mt-1 !opacity-100 text-sm md:text-[15px] ${reply?.sending ? "text-secondary" : "text-black/60"}`}
        >
          {reply?.sending ? "posting..." : timestamp(reply?.publishedAt)}
        </span>
      </header>
      <div className="ml-[50px] mt-1 prose">
        {Array.isArray(reply?.body) && <PortableText value={reply.body} />}
      </div>
      <div className="ml-[50px] mt-1 flex justify-between items-center">
        <div className="flex gap-5 comment-btns">
          <button
            type="button"
            onClick={() => {
              handleReaction("like");
            }}
          >
            <ThumbsUp
              className={
                optimisticReactions?.likes?.length !== 0
                  ? "stroke-black/70 stroke-[1.6] fill-secondary-500"
                  : ""
              }
            />
            {uniqueArr(optimisticReactions.likes)?.length}
          </button>
          <button
            type="button"
            onClick={() => {
              handleReaction("dislike");
            }}
          >
            <ThumbsDown
              className={
                optimisticReactions?.dislikes?.length !== 0
                  ? "stroke-black/70 stroke-[1.6] fill-secondary-500"
                  : ""
              }
            />
            {uniqueArr(optimisticReactions.dislikes)?.length}
          </button>
        </div>
        {ownsReply && (
          <AlertDialog>
            <AlertDialogTrigger className="hover:text-secondary">
              <Trash2 size={20} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Reply</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-bold">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="hover:bg-red-600 font-bold"
                  onClick={() => {
                    deleteReply(reply._id);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </article>
  );
};
export default Reply;
