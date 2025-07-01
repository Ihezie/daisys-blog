import {
  ChevronDown,
  Ellipsis,
  MessageSquareText,
  Pencil,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PortableText } from "next-sanity";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import {
  dislikeCommentAction,
  likeCommentAction,
  deleteCommentAction,
} from "@/app/actions";
import {
  useOptimistic,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useTransition,
} from "react";
import { Session } from "next-auth";
import CustomInput from "./CustomInput";
import { toast } from "sonner";
import { COMMENTS_QUERYResult, REPLIES_QUERYResult } from "@/sanity.types";
import { timestamp } from "@/lib/utils";
import Reply from "./Reply";
import { internalGroqTypeReferenceTo } from "@/sanity.types";
import { uuid } from "@sanity/uuid";

export type REPLY = REPLIES_QUERYResult[0] & {
  sending?: boolean;
};
export type REACTION = {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key: string;
  [internalGroqTypeReferenceTo]?: "user";
};

const Comment = ({
  comment,
  session,
  showReplyInput,
  setShowReplyInput,
}: {
  comment: COMMENT;
  session: Session | null;
  showReplyInput: string | false;
  setShowReplyInput: Dispatch<SetStateAction<string | false>>;
}) => {
  const ownsComment = session?.id === comment.user?._id;

  const [replies, setReplies] = useState<[] | REPLIES_QUERYResult>(
    comment.replies
  );
  const [optimisticReplies, addOptimisticReplies] = useOptimistic(
    replies,
    (state, newReply: REPLY) => [newReply, ...state]
  );
  const [showReplies, setShowReplies] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state: Array<REACTION> | undefined | null, action: REACTION | string) => {
      if (action instanceof Object) {
        if (state) {
          return [...state, action];
        }
      } else {
        const newState = state?.filter((like) => like._ref === action);
        return newState;
      }
    }
  );
  const [optimisticDislikes, addOptimisticDislike] = useOptimistic(
    dislikes,
    (state: Array<REACTION> | undefined | null, action: REACTION | string) => {
      if (action instanceof Object) {
        if (state) {
          return [...state, action];
        }
      } else {
        return state?.filter((dislike) => dislike._ref === action);
      }
    }
  );

  const handleReaction = (type: "like" | "dislike") => {
    if (!session) {
      toast("Please sign in");
      return;
    }
    const hasLiked = Boolean(
      optimisticLikes?.some((user) => user._ref === session?.id)
    );
    const hasDisliked = Boolean(
      optimisticDislikes?.some((user) => user._ref === session.id)
    );
    if (type === "like") {
      startTransition(async () => {
        if (hasDisliked) {
          addOptimisticDislike(session.id);
        }
        if (hasLiked) {
          addOptimisticLike(session.id); //Remove like
        } else {
          addOptimisticLike({
            _key: uuid(),
            _type: "reference",
            _ref: session.id,
          });
        }
        const updatedComment = await likeCommentAction(
          comment._id,
          hasLiked,
          hasDisliked
        );
        setLikes(updatedComment.likes);
        if (hasDisliked) {
          setDislikes(updatedComment.dislikes);
        }
      });
    } else {
      startTransition(async () => {
        if (hasLiked) {
          addOptimisticLike(session.id);
        }
        if (hasDisliked) {
          addOptimisticDislike(session.id);
        } else {
          addOptimisticDislike({
            _key: uuid(),
            _type: "reference",
            _ref: session.id,
          });
        }
        const updatedComment = await dislikeCommentAction(
          comment._id,
          hasDisliked,
          hasLiked
        );
        setDislikes(updatedComment.dislikes);
        if (hasLiked) {
          setLikes(updatedComment.likes);
        }
      });
    }
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
                disabled={isPending}
                type="button"
                onClick={() => {
                  handleReaction("like");
                }}
              >
                <ThumbsUp />
                {optimisticLikes?.length}
              </button>
              <button
                disabled={isPending}
                type="button"
                onClick={() => {
                  handleReaction("dislike");
                }}
              >
                <ThumbsDown />
                {optimisticDislikes?.length}
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
                    if (optimisticReplies.length === 0) setShowReplies(false);
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
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-secondary transition-colors outline-none focus:text-secondary">
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-20 mr-5 sm:mr-16">
                  <DropdownMenuItem>
                    <Pencil /> <span className="mt-[1px]">Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await deleteCommentAction(comment._id);
                    }}
                  >
                    <Trash2 /> <span className="mt-[1px]">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              addOptimisticReply={addOptimisticReplies}
              setReplies={setReplies}
            />
          </div>
        )}
        {optimisticReplies.length > 0 && (
          <button
            type="button"
            className="text-[13px] ml-12 mt-1 flex gap-1 items-center transition-colors text-secondary-400 font-bold hover:underline"
            onClick={() => {
              setShowReplies(!showReplies);
            }}
          >
            {optimisticReplies.length}{" "}
            {optimisticReplies.length > 1 ? "Replies" : "Reply"}
            <ChevronDown
              className={showReplies ? "rotate-180" : ""}
              size={18}
            />
          </button>
        )}
      </div>
      {showReplies && (
        <Replies optimisticReplies={optimisticReplies} session={session} />
      )}
    </>
  );
};
export default Comment;

const Replies = ({
  optimisticReplies,
  session,
}: {
  optimisticReplies: Array<REPLY>;
  session: Session | null;
}) => {
  return (
    <section className="pl-[50px] mt-2">
      {optimisticReplies.map((reply) => (
        <Reply key={reply._id} reply={reply} session={session} />
      ))}
    </section>
  );
};
