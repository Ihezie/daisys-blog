const PostCardSkeleton = () => {
  return (
    <div className="w-[280px] h-[450px] mx-auto bg-white rounded-3xl">
      <div className="h-[47%] overflow-hidden rounded-t-3xl bg-secondary-900 animate-pulse"></div>
      <div className="px-5 pt-5">
        <div className="flex justify-between text-sm font-semibold">
          <div className="rounded-full h-6 w-20 bg-secondary-900 animate-pulse"></div>
          <div className="rounded-full h-6 w-20 bg-secondary-900 animate-pulse"></div>
        </div>
        <div className="mt-3"></div>
        <div className="mt-2">
          <div className="rounded-full h-6 w-full bg-secondary-900 animate-pulse mb-2"></div>
          <div className="rounded-full h-6 w-full bg-secondary-900 animate-pulse mb-2"></div>
          <div className="rounded-full h-6 w-full bg-secondary-900 animate-pulse mb-2"></div>
          <div className="rounded-full h-6 w-full bg-secondary-900 animate-pulse mb-2"></div>
          <div className="rounded-full h-6 w-1/3 bg-secondary-900 animate-pulse mb-2"></div>
        </div>
      </div>
    </div>
  );
};
export default PostCardSkeleton;
