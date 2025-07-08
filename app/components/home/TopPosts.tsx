import { TOP_POSTS_QUERYResult } from "@/sanity.types";
import PostCard from "../posts/PostCard";

const TopPosts = async ({
  rawTopPosts,
}: {
  rawTopPosts: Promise<TOP_POSTS_QUERYResult>;
}) => {
  const topPosts = await rawTopPosts;
  if (topPosts.length === 0) {
    return <div></div>;
  }
  return (
    <section className="mt-16">
      <h2 className="text-center mb-8">Top Posts</h2>
      <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
        {topPosts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </section>
    </section>
  );
};
export default TopPosts;
