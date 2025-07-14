import SearchBar from "../../components/Search";
import PostCard from "../../components/posts/PostCard";
import { client } from "@/sanity/lib/client";
import type { FAVOURITE_POSTS_QUERYResult } from "@/sanity.types";
import { Metadata } from "next";
import { HeartCrack } from "lucide-react";
import { FAVOURITE_POSTS_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Posts",
};

const Favourites = async (props: {
  searchParams?: Promise<{ term?: string }>;
}) => {
  const session = await auth();

  if (!session) {
    return (
      <main className="pt-6">
        <h1 className="text-center text-secondary mb-6 md:hidden">
          Favourites
        </h1>
        <h2 className="opacity-30 text-center mt-36">
          Sign in to view your favourite posts
        </h2>
      </main>
    );
  }

  const searchParams = await props.searchParams;
  let params = {
    id: session?.id || "",
    term: searchParams?.term || null,
  };

  if (params.term) {
    params.term = params.term + "*"; // ensures that sanity matches posts that have titles that contain the term
  }
  const posts =
    (
      await client.fetch<FAVOURITE_POSTS_QUERYResult>(
        FAVOURITE_POSTS_QUERY,
        params,
        { cache: "no-store" }
      )
    )?.favouritePosts || [];

  return (
    <main className="pt-6 md:pt-12">
      <h1 className="text-center text-secondary mb-6 md:hidden">Favourites</h1>
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar fullWidth={true} />
      </header>
      {posts.length > 0 ? (
        <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} inFavourites={true} />
          ))}
        </section>
      ) : (
        <div className="items-center justify-center mt-20 text-[22px] flex gap-2">
          <h2 className="opacity-20">No Favourites</h2>
          <HeartCrack size={35} className="opacity-20" />
        </div>
      )}
    </main>
  );
};
export default Favourites;
