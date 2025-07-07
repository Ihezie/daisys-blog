const HomeCarouselSkeleton = () => {
  return (
    <section className="mt-10 bg-white p-3 pb-5 rounded-[32px] sm:p-5 lg:grid grid-cols-[60%_40%]">
      <div className="relative rounded-3xl">
        <div className="w-full bg-secondary-900 animate-pulse rounded-3xl h-[45vh] sm:h-[60vh] xs:h-[48vh] max-h-[420px] lg:h-[470px] lg:max-h-none"></div>
        <div className="flex mt-3 gap-5 justify-center lg:absolute lg:bottom-0 lg:-right-8 lg:translate-x-full lg:gap-4">
          <div className="bg-secondary-900 animate-pulse size-10 rounded-full"></div>
          <div className="bg-secondary-900 animate-pulse size-10 rounded-full"></div>
          <div className="bg-secondary-900 animate-pulse size-10 rounded-full"></div>
        </div>
      </div>
      <div className="mt-5 lg:mt-10 lg:px-8">
        <div className="w-full h-10 bg-secondary-900 animate-pulse rounded-full"></div>
        <div className="w-full hidden h-10 bg-secondary-900 animate-pulse rounded-full mt-2 lg:block"></div>
        <div className="flex mt-5 items-center justify-between">
          <div className="w-24 h-7 bg-secondary-900 animate-pulse rounded-full"></div>
          <div className="w-24 h-7 bg-secondary-900 animate-pulse rounded-full"></div>
        </div>
        <div className="mt-4 lg:mt-5">
          <div className="w-full h-5 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
          <div className="w-full h-5 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
          <div className="w-full h-5 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
          <div className="w-full h-5 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
          <div className="w-full h-5 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
          <div className="w-1/3 h-6 bg-secondary-900 animate-pulse rounded-full mb-2"></div>
        </div>
      </div>
    </section>
  );
};
export default HomeCarouselSkeleton;
