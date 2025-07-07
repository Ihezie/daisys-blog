import PostCardSkeleton from "@/app/components/loading_skeletons/PostCardSkeleton";

const loading = () => {
  return (
    <main className="pt-12">
      <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="bg-secondary-900 h-[54px] animate-pulse rounded-full sm:w-1/2"></div>
        <div className="w-[170px] h-11 rounded-xl bg-secondary-900 animate-pulse"></div>
      </header>
      <section className="grid grid-cols-auto-fill gap-8 justify-between max-[740px]:justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    </main>
  );
};
export default loading;
