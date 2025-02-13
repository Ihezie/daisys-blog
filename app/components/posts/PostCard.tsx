"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, formatPreview } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type SinglePostQuery = POSTS_QUERYResult[0];

const PostCard = ({ post }: { post: SinglePostQuery }) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(500).height(400).url()
    : null;
  const categoryColor = post.category?.tailwindColor || "bg-purple-400";

  return (
    <div className="w-[280px] h-[450px] mx-auto bg-white rounded-3xl custom-transition-all">
      <div className="h-[47%] overflow-hidden rounded-t-3xl hover-effect">
        <Link href={`/posts/${post?.slug?.current}`}>
          <Image
            src={postImageUrl || "/no-image.jpg"}
            width={300}
            height={200}
            alt={post?.title || "no image"}
            className="rounded-t-3xl object-cover hover:scale-125"
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
        <h3 className="text-lg capitalize mt-3">{post?.title}</h3>
        <p className="mt-2 leading-tight text-slate-500">
          {Array.isArray(post.body) && formatPreview(post?.body)}
          <span className="text-3xl/[0px]">&#8230;</span>
          <Link href={`/posts/${post?.slug?.current}`} className="block mt-1">
            <span className="text-black hover:text-secondary">
              read more{" "}
              <MoveRight className="inline-block hover:text-secondary" />{" "}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default PostCard;
