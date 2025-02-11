"use client";

import CategoryCard from "./CategoryCard";
import CarouselBtn from "./CarouselBtn";
import { useEffect, useRef } from "react";
import { CATEGORIES_QUERYResult } from "@/sanity.types";

const CategoryCarousel = ({
  categories,
}: {
  categories: CATEGORIES_QUERYResult;
}) => {
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
        <div
          ref={cardsContainerParentRef}
          className="pt-8 pb-10 md:overflow-x-hidden"
        >
          <div
            ref={cardsContainerRef}
            className={`grid grid-cols-2 custom-transition gap-x-4 gap-y-10 justify-items-center md:flex md:gap-5 md:w-max`}
          >
            {categories?.map((category) => (
              <CategoryCard key={category._id} category={category} />
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
