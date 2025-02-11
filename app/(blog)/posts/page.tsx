import SearchBar from "../../components/Search";
import PostCard from "../../components/posts/PostCard";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { Metadata } from "next";
import Filter from "@/app/components/Filter";
import { Frown } from "lucide-react";

export const metadata: Metadata = {
  title: "Posts",
};

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && !defined($term) || title match $term]|order(publishedAt desc){ _id, title, publishedAt, category, image, body }`
);
const CATEGORY_NAMES_QUERY = defineQuery(
  `*[_type == "category" && defined(_id)]{_id, name}`
);

const options = { next: { revalidate: 30 } };

const Posts = async (props: { searchParams?: Promise<{ term?: string }> }) => {
  const searchParams = await props.searchParams;
  let params = { term: searchParams?.term || null };
  if (params.term) {
    params.term = params.term + "*"; // ensures that sanity matches posts that have titles that contain the term
  }
  const posts = await client.fetch<POSTS_QUERYResult>(
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

  return (
    <main className="pt-12">
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <Filter categories={categories} />
      </header>
      {posts.length > 0 ? (
        <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </section>
      ) : (
        <div className="items-center mt-20 text-[22px] flex flex-col gap-2">
          <span className="font-semibold">No Posts Found</span>
          <Frown size={35} color="red" />
        </div>
      )}
    </main>
  );
};
export default Posts;
