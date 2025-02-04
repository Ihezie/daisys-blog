"use client";

import CategoryCard from "./CategoryCard";
import { categories } from "@/app/data";
import CarouselBtn from "./CarouselBtn";
import { useEffect, useRef } from "react";

const CategoryCarousel = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerParentRef = useRef<HTMLDivElement>(null);
  const forwards = () => {
    const containerWidth =
      cardsContainerRef.current?.getBoundingClientRect()?.width;
    const containerParentWidth =
      cardsContainerParentRef.current?.getBoundingClientRect()?.width;
    if (containerParentWidth && containerWidth) {
      let translateValue = containerWidth - containerParentWidth;
      translateValue = Math.round(translateValue);
      cardsContainerRef.current!.style.transform = `translate(-${translateValue}px)`;
    }
  };
  const backwards = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current!.style.transform = `translate(0)`;
    }
  };
  useEffect(() => {
    let id: any;
    const handler = () => {
      clearTimeout(id);
      id = setTimeout(() => {
        backwards();
      }, 300);
    };
    window.addEventListener("resize", handler);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section className="my-16">
      <h2 className="text-center">Categories</h2>
      <section className="relative">
        <div className="absolute abs-center-y -left-16 hidden md:flex">
          <CarouselBtn icon="left" handleClick={backwards} />
        </div>
        <div ref={cardsContainerParentRef} className="md:overflow-hidden">
          <div
            ref={cardsContainerRef}
            className={`grid grid-cols-2 mt-6 gap-x-4 gap-y-10 justify-items-center md:flex md:gap-5 md:w-max`}
          >
            {Object.entries(categories).map(([name, info]) => (
              <CategoryCard key={name} name={name} info={info} />
            ))}
          </div>
        </div>
        <div className="absolute abs-center-y -right-16 hidden md:flex">
          <CarouselBtn icon="right" handleClick={forwards} />
        </div>
      </section>
    </section>
  );
};
export default CategoryCarousel;
