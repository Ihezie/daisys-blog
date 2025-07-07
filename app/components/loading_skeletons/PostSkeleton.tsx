const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Title Placeholder */}
      <div className="h-6 w-3/5 bg-secondary-900 rounded"></div>

      {/* Image Placeholder */}
      <div className="h-48 w-full bg-secondary-900 rounded"></div>

      {/* Content Placeholder */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-secondary-900 rounded"></div>
        <div className="h-4 w-full bg-secondary-900 rounded"></div>
        <div className="h-4 w-4/5 bg-secondary-900 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
