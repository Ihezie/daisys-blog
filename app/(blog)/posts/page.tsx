import SearchBar from "../../components/Search";
import PostCard from "../../components/posts/PostCard";
import { client } from "@/sanity/lib/client";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { Metadata } from "next";
import Filter from "@/app/components/Filter";
import { HeartCrack } from "lucide-react";
import {
  POSTS_QUERY,
  CATEGORY_NAMES_QUERY,
  FAVOURITE_POSTS_IDS_QUERY,
} from "@/sanity/lib/queries";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Posts",
};

const options = { next: { revalidate: 30 } };

export type POST = POSTS_QUERYResult[0] & { isFavourite?: boolean };

const Posts = async (props: {
  searchParams?: Promise<{ term?: string; filter?: string }>;
}) => {
  const searchParams = await props.searchParams;
  let params = {
    term: searchParams?.term || null,
    filter: searchParams?.filter || null,
  };
  if (params.term) {
    params.term = params.term + "*"; // ensures that sanity matches posts that have titles that contain the term
  }
  const posts: POST[] = await client.fetch<POSTS_QUERYResult>(
    POSTS_QUERY,
    params,
    options
  );

  const categories = await client.fetch(
    CATEGORY_NAMES_QUERY,
    {},
    {
      cache: "force-cache",
    }
  );
  const session = await auth();

  if (session) {
    const favouritePosts = (await client.fetch(
      FAVOURITE_POSTS_IDS_QUERY,
      { id: session.id || "" },
      { next: { tags: ["favourites"] } }
    )) || { favouritePosts: [] };

    // Mark posts as favourite if they are in the user's favourites
    posts.forEach((post) => {
      post.isFavourite =
        favouritePosts.favouritePosts?.some(
          (favouritePost) => favouritePost._id === post._id
        ) || false;
    });
  }

  return (
    <main className="pt-6 md:pt-12">
      <h1 className="text-center text-secondary mb-6 md:hidden">Posts</h1>
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <Filter categories={categories} />
      </header>
      {posts.length > 0 ? (
        <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} session={session} />
          ))}
        </section>
      ) : (
        <div className="items-center justify-center mt-20 text-[22px] flex gap-2 h-">
          <h2 className="opacity-20">No Posts</h2>
          <HeartCrack size={35} className="opacity-20" />
        </div>
      )}
    </main>
  );
};
export default Posts;
