import { TOP_POSTS_QUERYResult } from "@/sanity.types";
import PostCard from "../posts/PostCard";
import { Session } from "next-auth";
import { FAVOURITE_POSTS_IDS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import type { POST } from "@/app/(blog)/posts/page";

const TopPosts = async ({
  rawTopPosts,
  session,
}: {
  rawTopPosts: Promise<TOP_POSTS_QUERYResult>;
  session: Session | null;
}) => {
  const topPosts: POST[] = await rawTopPosts;
  if (topPosts.length === 0) {
    return <div></div>;
  }
  if (session) {
    const favouritePosts = (await client.fetch(
      FAVOURITE_POSTS_IDS_QUERY,
      { id: session.id || "" },
      { next: { tags: ["favourites"] } }
    )) || { favouritePosts: [] };
    // Mark posts as favourite if they are in the user's favourites
    topPosts.forEach((post) => {
      post.isFavourite =
        favouritePosts.favouritePosts?.some(
          (favouritePost) => favouritePost._id === post._id
        ) ?? false;
    });
  } 
  return (
    <section className="mt-16">
      <h2 className="text-center mb-8">Top Posts</h2>
      <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
        {topPosts.map((post) => (
          <PostCard post={post} key={post._id} session={session} />
        ))}
      </section>
    </section>
  );
};
export default TopPosts;
