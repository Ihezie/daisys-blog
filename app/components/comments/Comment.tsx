import {
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
import { DateTime } from "ts-luxon";
import { Session } from "next-auth";
import { COMMENT } from "@/app/(blog)/posts/[slug]/page";
import {
  dislikeCommentAction,
  likeCommentAction,
  deleteCommentAction,
} from "@/app/actions";
import { useTransition } from "react";

const Comment = ({
  comment,
  session,
}: {
  comment: COMMENT;
  session: Session | null;
}) => {
  const timestamp = (date: string | null) => {
    if (date) {
      if (date === "posting...") {
        return date;
      }
      const posted = DateTime.fromISO(date);
      const current = DateTime.now();
      const diff = current.diff(posted, [
        "seconds",
        "minutes",
        "hours",
        "days",
        "weeks",
        "months",
        "years",
      ]);
      const maxUnit = diff.getMaxUnit(false);
      const maxUnitStr =
        diff[maxUnit] === 1 ? maxUnit.replace(/s$/, "") : (maxUnit as string);
      let timeSince = diff[maxUnit] as number;
      timeSince = Math.round(timeSince);
      return `${timeSince} ${maxUnitStr} ago`;
    }
  };
  const ownsComment = session?.id === comment.user?._id;

  const [approvalIsPending, startApprovalTransition] = useTransition();
  const [deleteIsPending, startDeleteTransition] = useTransition();

  return (
    <article className={comment.sending || deleteIsPending ? "[&_*]:opacity-50 pointer-events-none" : ""}>
      <header className={"flex !opacity-100 items-center gap-3"}>
        <div
          className={`size-[38px] rounded-full overflow-hidden relative border-2  hover:border-secondary cursor-pointer z-[100]"}`}
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
          className={`mt-1 !opacity-100 text-sm md:text-[15px] ${comment?.publishedAt === "posting..." ? "text-secondary" : "text-black/60"}`}
        >
          {timestamp(comment?.publishedAt)}
        </span>
      </header>
      <div className="ml-[50px] mt-1 prose">
        {Array.isArray(comment?.body) && <PortableText value={comment.body} />}
      </div>
      <div className="ml-[50px] mt-1 flex justify-between items-center">
        <div className="flex gap-5 comment-btns">
          <button
            className={`${approvalIsPending ? "opacity-25" : ""}`}
            disabled={approvalIsPending}
            type="button"
            onClick={() => {
              startApprovalTransition(async () => {
                await likeCommentAction(
                  comment._id,
                  comment.likes,
                  comment.dislikes
                );
              });
            }}
          >
            <ThumbsUp />
            {comment.likes?.length}
          </button>
          <button
            className={`${approvalIsPending ? "opacity-30" : ""}`}
            disabled={approvalIsPending}
            type="button"
            onClick={() => {
              startApprovalTransition(async () => {
                await dislikeCommentAction(
                  comment._id,
                  comment.likes,
                  comment.dislikes
                );
              });
            }}
          >
            <ThumbsDown />
            {comment.dislikes?.length}
          </button>
          <button type="button">
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
                onClick={() => {
                  startDeleteTransition(async () => {
                    await deleteCommentAction(comment._id);
                  });
                }}
              >
                <Trash2 /> <span className="mt-[1px]">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </article>
  );
};
export default Comment;
