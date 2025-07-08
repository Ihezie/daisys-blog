import PostCardSkeleton from "@/app/components/loading_skeletons/PostCardSkeleton";

const TopPostsSkeleton = () => {
  return (
    <section className="mt-16">
      <h2 className="text-center mb-8">Top Posts</h2>
      <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    </section>
  );
};
export default TopPostsSkeleton;
