import type { POSTS_QUERYResult } from "@/sanity.types";
import PostCard from "./PostCard";

const Posts = async ({
  rawPosts,
}: {
  rawPosts: Promise<POSTS_QUERYResult>;
}) => {
  const posts = await rawPosts;
  return (
    <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </section>
  );
};
export default Posts;
