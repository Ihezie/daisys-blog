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
import { COMMENTS_QUERYResult } from "@/sanity.types";
import { PortableText } from "next-sanity";
import { DateTime } from "ts-luxon";

const Comment = ({ comment }: { comment: COMMENTS_QUERYResult[0] }) => {
  const timestamp = (date: string | null) => {
    if (date) {
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

  return (
    <article>
      <header className="flex items-center gap-3">
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
        <span className="mt-1 text-black/60">
          {timestamp(comment?.publishedAt)}
        </span>
      </header>
      <div className="ml-[50px] mt-1 prose">
        {Array.isArray(comment?.body) && <PortableText value={comment.body} />}
      </div>
      <div className="ml-[50px] mt-5 flex justify-between items-center">
        <div className="flex gap-5 comment-btns">
          <button type="button">
            <ThumbsUp />
            {comment.likes}
          </button>
          <button type="button">
            <ThumbsDown />
            {comment.dislikes}
          </button>
          <button type="button">
            <MessageSquareText /> Reply
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-secondary transition-colors outline-none focus:text-secondary">
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-20 mr-5 sm:mr-16">
            <DropdownMenuItem>
              <Pencil /> <span className="mt-[1px]">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 /> <span className="mt-[1px]">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
};
export default Comment;
