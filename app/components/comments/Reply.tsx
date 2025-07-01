import { Ellipsis, Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PortableText } from "next-sanity";
import { Session } from "next-auth";
import {
  dislikeCommentAction,
  likeCommentAction,
  deleteCommentAction,
} from "@/app/actions";
import { useTransition, useEffect } from "react";
import type { REPLY } from "./Comment";
import { timestamp } from "@/lib/utils";
import { toast } from "sonner";
import { useState, useRef } from "react";

const Reply = ({
  reply,
  session,
}: {
  reply: REPLY;
  session: Session | null;
}) => {
  const ownsReply = session?.id === reply.user?._id;

  const [approvalIsPending, startApprovalTransition] = useTransition();
  const [deleteIsPending, startDeleteTransition] = useTransition();

  const handleReaction = (type: "like" | "dislike") => {
    if (!session) {
      toast("Please sign in");
      return;
    }
    startApprovalTransition(async () => {
      if (type === "like") {
        await likeCommentAction(reply._id, reply.likes, reply.dislikes);
      } else {
        await dislikeCommentAction(reply._id, reply.likes, reply.dislikes);
      }
      setCommentFetchIsPending(true);
    });
  };

  useEffect(() => {
    if (lengthOfLikes.current !== reply.likes?.length) {
      setCommentFetchIsPending(false);
      lengthOfLikes.current = reply?.likes?.length;
    }
    if (lengthOfDislikes.current !== reply.dislikes?.length) {
      setCommentFetchIsPending(false);
      lengthOfDislikes.current = reply.dislikes?.length;
    }
  }, [reply]);

  const [commentFetchIsPending, setCommentFetchIsPending] = useState(false);
  const lengthOfLikes = useRef<number>(reply.likes?.length);
  const lengthOfDislikes = useRef<number>(reply.dislikes?.length);

  return (
    <article
      className={reply.sending || deleteIsPending ? "[&_*]:opacity-50 pointer-events-none" : ""}
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
            className={`${approvalIsPending || commentFetchIsPending ? "opacity-25" : ""}`}
            disabled={approvalIsPending || commentFetchIsPending}
            type="button"
            onClick={() => {
              handleReaction("like");
            }}
          >
            <ThumbsUp />
            {reply.likes?.length}
          </button>
          <button
            className={`${approvalIsPending || commentFetchIsPending ? "opacity-30" : ""}`}
            disabled={approvalIsPending || commentFetchIsPending}
            type="button"
            onClick={() => {
              handleReaction("dislike");
            }}
          >
            <ThumbsDown />
            {reply.dislikes?.length}
          </button>
        </div>
        {ownsReply && (
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
                    await deleteCommentAction(reply._id);
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
export default Reply;
