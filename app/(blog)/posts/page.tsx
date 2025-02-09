import SearchBar from "../../components/Search";
import PostCard from "../../components/posts/PostCard";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { POSTS_QUERYResult } from "@/sanity.types";
import { Metadata } from "next";
import Filter from "@/app/components/Filter";

export const metadata: Metadata = {
  title: "Posts",
};

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){ _id, title, publishedAt, category, image, body }`
);

const options = { next: { revalidate: 30 } };

const Posts = async () => {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY, {}, options);

  return (
    <main className="pt-12">
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <Filter />
      </header>
      <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard post={post} key={post._id} />)
        ) : (
          <p>No posts available</p>
        )}
      </section>
    </main>
  );
};
export default Posts;
