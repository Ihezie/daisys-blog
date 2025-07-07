const CategoriesCarouselSkeleton = () => {
  return (
    <section className="my-16">
      <h2 className="text-center">Categories</h2>
      <section className="relative">
        <div className="absolute abs-center-y -left-16 hidden md:flex"></div>
        <div className="pt-8 pb-10 md:overflow-x-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 custom-transition gap-x-4 gap-y-10 justify-items-center md:flex md:gap-5 md:w-max">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-60 rounded-3xl bg-white p-[7px] hover:scale-[1.08] w-[160px] lg:flex-none"
              >
                <div className="rounded-[20px] relative h-[85%] bg-secondary-900 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute abs-center-y -right-16 hidden md:flex"></div>
      </section>
    </section>
  );
};
export default CategoriesCarouselSkeleton;
