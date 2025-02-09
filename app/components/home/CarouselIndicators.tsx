const CarouselIndicators = ({
  amount,
  currentIndex,
}: {
  amount: number;
  currentIndex: number;
}) => {
  return (
    <div className="absolute bottom-4 abs-center-x flex gap-2">
      {[...Array(amount)].map((_, i) => (
        <span
          key={i}
          className={`size-[6px] custom-transition inline-block rounded-full shadow-sm ${
            currentIndex === i ? "w-[14px] bg-secondary-700" : "bg-white"
          }`}
        ></span>
      ))}
    </div>
  );
};
export default CarouselIndicators;
