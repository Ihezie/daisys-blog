import {
  ChevronDown,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { PortableText} from "next-sanity";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import {
  dislikeCommentAction,
  likeCommentAction,
  deleteCommentAction,
} from "@/app/actions";
import {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { Session } from "next-auth";
import CustomInput from "./CustomInput";
import { toast } from "sonner";
import { timestamp } from "@/lib/utils";
import Reply from "./Reply";

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
import { COMMENTS_QUERYResult } from "@/sanity.types";
import { OptimisticCommentActionType } from "./CommentSection";

export type REPLY = COMMENTS_QUERYResult[0]["replies"][0] & {
  sending?: boolean;
};

const Comment = ({
  comment,
  session,
  showReplyInput,
  setShowReplyInput,
  handleOptimisticComments,
  setComments,
}: {
  comment: COMMENT;
  session: Session | null;
  showReplyInput: string | false;
  setShowReplyInput: Dispatch<SetStateAction<string | false>>;
  handleOptimisticComments: (action: OptimisticCommentActionType) => void;
  setComments: Dispatch<SetStateAction<[] | COMMENTS_QUERYResult>>;
}) => {
  const ownsComment = session?.id === comment.user?._id;

  const [showReplies, setShowReplies] = useState(false);

  const [, startTransition] = useTransition();

  const handleReaction = (type: "like" | "dislike") => {
    if (!session) {
      toast("Please sign in");
      return;
    }
    const hasLiked = Boolean(
      comment.likes?.some((user) => user._ref === session?.id)
    );
    const hasDisliked = Boolean(
      comment.dislikes?.some((user) => user._ref === session.id)
    );
    if (type === "like") {
      startTransition(async () => {
        if (hasLiked) {
          handleOptimisticComments({
            type: "REMOVE LIKE",
            payload: {
              commentId: comment._id,
              userId: session.id,
              reaction: null,
            },
          });
        } else {
          handleOptimisticComments({
            type: "ADD LIKE",
            payload: {
              commentId: comment._id,
              userId: session.id,
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
          comment._id,
          hasLiked,
          hasDisliked
        );
        setComments((prev) => {
          return prev.map((c) => {
            if (c._id === comment._id) {
              return {
                ...comment,
                likes: updatedComment?.likes || [],
                dislikes: updatedComment?.dislikes || [],
              };
            }
            return c;
          });
        });
      });
    } else if (type === "dislike") {
      startTransition(async () => {
        if (hasDisliked) {
          handleOptimisticComments({
            type: "REMOVE DISLIKE",
            payload: {
              commentId: comment._id,
              userId: session.id,
              reaction: null,
            },
          });
        } else {
          handleOptimisticComments({
            type: "ADD DISLIKE",
            payload: {
              commentId: comment._id,
              userId: session.id,
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
          comment._id,
          hasDisliked,
          hasLiked
        );
        setComments((prev) => {
          return prev.map((c) => {
            if (c._id === comment._id) {
              return {
                ...comment,
                likes: updatedComment?.likes || [],
                dislikes: updatedComment?.dislikes || [],
              };
            }
            return c;
          });
        });
      });
    }
  };
  const deleteComment = (id: string) => {
    startTransition(async () => {
      handleOptimisticComments({
        type: "REMOVE COMMENT",
        payload: id,
      });
      await deleteCommentAction(id);
      setComments((prev) => {
        return prev.filter((comment) => comment._id !== id);
      });
    });
  };
  return (
    <>
      <div>
        <article
          className={
            comment.sending ? "[&_*]:opacity-50 pointer-events-none" : ""
          }
        >
          <header className={"flex !opacity-100 items-center gap-3"}>
            <div
              className={`size-[38px] rounded-full overflow-hidden relative border-2 z-[100]"}`}
            >
              <Image
                src={comment?.user?.avatar || "/default-avatar.jpg"}
                alt="User Avatar"
                fill
                sizes="10vw"
              />
            </div>
            <h3>{comment?.user?.name}</h3>
            <span
              className={`mt-1 !opacity-100 text-sm md:text-[15px] ${comment?.sending ? "text-secondary" : "text-black/60"}`}
            >
              {comment.sending ? "posting..." : timestamp(comment.publishedAt)}
            </span>
          </header>
          <div className="ml-[50px] mt-1 prose">
            {Array.isArray(comment?.body) && (
              <PortableText value={comment.body} />
            )}
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
                    comment.likes?.length !== 0
                      ? "stroke-black/70 stroke-[1.6] fill-secondary-500"
                      : ""
                  }
                />
                {uniqueArr(comment.likes)?.length}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleReaction("dislike");
                }}
              >
                <ThumbsDown
                  className={
                    comment.dislikes?.length !== 0
                      ? "stroke-black/70 stroke-[1.6] fill-secondary-500"
                      : ""
                  }
                />
                {uniqueArr(comment.dislikes)?.length}
              </button>
              <button
                className={`${showReplyInput === comment?._id ? "active" : ""}`}
                type="button"
                onClick={() => {
                  if (!session) {
                    toast("Please sign in");
                    return;
                  }
                  if (showReplyInput === comment?._id) {
                    setShowReplyInput(false);
                    if (comment.replies.length === 0) setShowReplies(false);
                  } else {
                    setShowReplyInput(comment?._id);
                    setShowReplies(true);
                  }
                }}
              >
                <MessageSquareText /> Reply
              </button>
            </div>
            {ownsComment && (
              <AlertDialog>
                <AlertDialogTrigger className="hover:text-secondary">
                  <Trash2 size={20} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Comment</AlertDialogTitle>
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
                        deleteComment(comment._id);
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
        {showReplyInput === comment?._id && (
          <div className="flex pl-[50px] mt-5 gap-3">
            <div
              className={`size-[30px] rounded-full overflow-hidden relative border-2 flex-shrink-0`}
            >
              <Image
                src={session?.user?.image || "/default-avatar.jpg"}
                alt="User Avatar"
                fill
                sizes="10vw"
              />
            </div>
            <CustomInput
              postId={comment.post?._id}
              commentId={comment._id}
              session={session}
              type="reply"
              handleOptimisticComments={handleOptimisticComments}
              setComments={setComments}
              setShowReplyInput={setShowReplyInput}
            />
          </div>
        )}
        {comment.replies?.length > 0 && (
          <button
            type="button"
            className="text-[13px] ml-12 mt-1 flex gap-1 items-center transition-colors text-secondary-400 font-bold hover:underline"
            onClick={() => {
              setShowReplies(!showReplies);
            }}
          >
            {comment.replies?.length}{" "}
            {comment.replies?.length > 1 ? "Replies" : "Reply"}
            <ChevronDown
              className={showReplies ? "rotate-180" : ""}
              size={18}
            />
          </button>
        )}
      </div>
      {showReplies && (
        <section className="pl-[50px] mt-2">
          {comment.replies?.map((reply) => (
            <Reply
              key={reply._id}
              reply={reply}
              session={session}
              handleOptimisticComments={handleOptimisticComments}
              setComments={setComments}
            />
          ))}
        </section>
      )}
    </>
  );
};
export default Comment;
