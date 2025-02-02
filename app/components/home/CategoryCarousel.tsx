"use client";

import CategoryCard from "./CategoryCard";
import { categories } from "@/app/data";
import CarouselBtn from "./CarouselBtn";
import { useState } from "react";

const CategoryCarousel = () => {
  const [scroll, setScroll] = useState(false);
  const forwards = () => {
    setScroll(true);
  };
  const backwards = () => {
    setScroll(false);
  };
  return (
    <section className="mt-16">
      <h2 className="text-center">Categories</h2>
      <section className="relative">
        <div className="absolute abs-center-y -left-16 hidden lg:flex">
          <CarouselBtn icon="left" handleClick={backwards} />
        </div>
        <div className="lg:overflow-hidden lg:h-80 relative">
          <div
            className={`grid grid-cols-2 mt-6 gap-4 justify-items-center md:grid-cols-3 xs:gap-y-9 lg:absolute lg:flex lg:gap-5 lg:w-max ${
              scroll ? "lg:-translate-x-1/3" : ""
            }`}
          >
            {Object.entries(categories).map(([name, info]) => (
              <CategoryCard key={name} name={name} info={info} />
            ))}
          </div>
        </div>
        <div className="absolute abs-center-y -right-16 hidden lg:flex">
          <CarouselBtn icon="right" handleClick={forwards} />
        </div>
      </section>
    </section>
  );
};
export default CategoryCarousel;
