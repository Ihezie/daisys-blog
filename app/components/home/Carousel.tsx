"use client";

import Image from "next/image";
import CarouselBtn from "./CarouselBtn";
import { carouselData, categories } from "@/app/data";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import CarouselIndicators from "./CarouselIndicators";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const nextSlide = () => {
    if (currentIndex === carouselData.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(carouselData.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    if (play) {
      const id = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => {
        clearInterval(id);
      };
    }
  }, [currentIndex, play]);
  return (
    <section className="mt-10 bg-white p-3 pb-5 rounded-[32px] sm:p-5 lg:grid grid-cols-[60%_40%]">
      <div className="relative rounded-3xl">
        <div className="flex rounded-3xl relative overflow-hidden">
          {carouselData.map((item, index) => {
            let position = "";
            if (currentIndex > index) {
              position = "prev-slide";
            } else if (currentIndex < index) {
              position = "next-slide";
            }
            return (
              <Image
                key={item.id}
                src={item.image}
                width={1260}
                height={1240}
                alt={item.title}
                className={`rounded-3xl ${position} flex-none h-[45vh] sm:h-[60vh] xs:h-[48vh] max-h-[420px] min-height object-cover lg:max-h-[500px]`}
              />
            );
          })}
          <CarouselIndicators
            amount={carouselData.length}
            currentIndex={currentIndex}
          />
        </div>
        <div className="flex mt-3 gap-5 justify-center lg:absolute lg:bottom-0 lg:-right-8 lg:translate-x-full lg:gap-4">
          <CarouselBtn handleClick={prevSlide} icon="left" />
          <div
            onClick={() => {
              setPlay(!play);
            }}
          >
            {play ? <CarouselBtn icon="pause" /> : <CarouselBtn icon="play" />}
          </div>
          <CarouselBtn handleClick={nextSlide} icon="right" />
        </div>
      </div>
      {carouselData[currentIndex]?.id === "blog-desc" ? (
        <article className="mt-5 lg:mt-16 lg:px-8 max-xl:lg:mb-10 text-center lg:text-left">
          <header className="flex gap-3 items-center justify-center lg:justify-start">
            <h1>{carouselData[currentIndex].title}</h1>
            <Image
              src="/wave.gif"
              width={40}
              height={40}
              className="inline-block"
              alt="wave"
            />
          </header>
          <p className="mt-4 lg:mt-8">{carouselData[currentIndex]?.body}</p>
          <div className="mt-2 space-x-2">
            <Image
              src="/dress.gif"
              width={40}
              height={40}
              className="inline-block"
              alt="dress"
            />
            <Image
              src="/organic-cream.gif"
              width={40}
              height={40}
              className="inline-block"
              alt="organic-cream"
            />
            <Image
              src="/training.gif"
              width={40}
              height={40}
              className="inline-block"
              alt="organic-cream"
            />
          </div>
        </article>
      ) : (
        <article className="mt-5 lg:mt-16 lg:px-8">
          <h1>{carouselData[currentIndex].title}</h1>
          <div className="flex mt-5 items-center justify-between">
            <span
              className={`${
                categories[carouselData[currentIndex]?.category]?.color
              } py-[2px] px-3 rounded-full`}
            >
              {carouselData[currentIndex]?.category}
            </span>
            <span className="font-semibold bg-cyan-200 py-[2px] px-3 rounded-full">
              {carouselData[currentIndex]?.date}
            </span>
          </div>
          <p className="mt-4 lg:mt-8">
            {carouselData[currentIndex].body.slice(0, 200).trim()}
            <span className="text-3xl/[0px]">&#8230;</span>
            <button type="button" className="block mt-3">
              <Link href="" className="hover:text-secondary group">
                read more{" "}
                <MoveRight className="inline-block group-hover:text-secondary transition-none" />{" "}
              </Link>
            </button>
          </p>
        </article>
      )}
    </section>
  );
};
export default Carousel;
