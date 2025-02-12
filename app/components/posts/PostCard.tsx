import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, formatPreview } from "@/lib/utils";

type SinglePostQuery = POSTS_QUERYResult[0];

const PostCard = ({ post }: { post: SinglePostQuery }) => {
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(500).height(400).url()
    : null;
  const categoryColor = post.category?.tailwindColor
    ? `bg-${post.category?.tailwindColor}`
    : "bg-purple-400";
  return (
    <div className="w-[280px] h-[450px] mx-auto bg-white rounded-3xl cursor-pointer group custom-transition-all">
      <div className="h-[47%] overflow-hidden rounded-t-3xl">
        <Image
          src={postImageUrl || "/no-image.jpg"}
          width={300}
          height={200}
          alt={post?.title || "no image"}
          className="rounded-t-3xl object-cover group-hover:scale-125"
        />
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
          <button type="button" className="block mt-1">
            <Link
              href=""
              className="group-hover:text-secondary group text-black"
            >
              read more{" "}
              <MoveRight className="inline-block group-hover:text-secondary !transition-none" />{" "}
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};
export default PostCard;
