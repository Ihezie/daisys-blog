"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquareText, MoveRight } from "lucide-react";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, formatPreview } from "@/lib/utils";
import { formatTitle } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useOptimistic, useEffect } from "react";
import { handleFavouritesAction } from "@/app/actions";
import { startTransition } from "react";
import { Session } from "next-auth";
import { toast } from "sonner";

type SinglePostQuery = Omit<POSTS_QUERYResult[0], "isFavourite"> & {
  isFavourite?: boolean;
};

const PostCard = ({
  post,
  inFavourites = false,
  session,
}: {
  post: SinglePostQuery;
  inFavourites?: boolean;
  session?: Session | null;
}) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(500).height(400).url()
    : null;
  const categoryColor = post.category?.tailwindColor || "bg-purple-400";

  const [isFavourite, setIsFavourite] = useState(
    post.isFavourite || inFavourites
  );

  const [optimisticIsFavourite, optimisticSetIsFavourite] = useOptimistic(
    isFavourite,
    (_, newValue: boolean) => newValue
  );
  function handleFavourites() {
    startTransition(async () => {
      optimisticSetIsFavourite(!optimisticIsFavourite);
      await handleFavouritesAction(post._id, !optimisticIsFavourite);
      setIsFavourite(!optimisticIsFavourite);
    });
  }

  useEffect(() => {
    if (!session) {
      setIsFavourite(false);
    }
  }, [session]);

  return (
    <div className="w-[280px] h-[450px] mx-auto bg-white rounded-3xl relative">
      <div className="h-[47%] overflow-hidden rounded-t-3xl hover-effect">
        <Link href={`/posts/${post?.slug?.current}`}>
          <Image
            src={postImageUrl || "/no-image.jpg"}
            width={300}
            height={200}
            alt={post?.title || "no image"}
            className="rounded-t-3xl object-cover hover:scale-125 custom-transition hover:brightness-75"
          />
        </Link>
      </div>
      <div className="px-5 pt-5">
        <div className="flex justify-between text-sm font-semibold">
          <span className={`py-[2px] px-3 rounded-full ${categoryColor}`}>
            {post?.category?.name}
          </span>
          <span className="bg-cyan-200 py-[2px] px-3 rounded-full">
            {formatDate(post?.publishedAt || "")}
          </span>
        </div>
        <h3 className="text-lg capitalize mt-3">{formatTitle(post?.title)}</h3>
        <p className="mt-2 leading-tight text-slate-500">
          {Array.isArray(post.body) && formatPreview(post?.body)}
          <span className="text-3xl/[0px]">&#8230;</span>
          <Link
            href={`/posts/${post?.slug?.current}`}
            className="block mt-1 custom-transition-all"
          >
            <span className="text-black hover:text-secondary font-semibold">
              read more{" "}
              <MoveRight className="inline-block hover:text-secondary" />{" "}
            </span>
          </Link>
        </p>
      </div>
      <div className="flex items-center gap-1 absolute bottom-1 right-5">
        <motion.button
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.1 },
          }}
          onClick={() => {
            if (session) {
              handleFavourites();
            } else {
              toast("Please sign in");
            }
          }}
          className="p-[6px] rounded-full like-button transition-colors duration-300 hover:bg-secondary-900"
        >
          <Heart
            className={
              optimisticIsFavourite ? "fill-secondary stroke-secondary" : ""
            }
            size={22}
            strokeWidth={2.2}
          />
        </motion.button>
        <div>
          <MessageSquareText size={22} className="inline-block mr-1" />
          <span className="text-lg align-middle">{post?.noOfComments}</span>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
