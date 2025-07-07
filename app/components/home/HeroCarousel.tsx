"use client";

import Image from "next/image";
import CarouselBtn from "./CarouselBtn";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import React, { useState, useEffect, use } from "react";
import CarouselIndicators from "./CarouselIndicators";
import { AboutBlog, aboutBlog } from "@/app/data";
import { CAROUSEL_POSTS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, formatPreview, formatTitle } from "@/lib/utils";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

const HeroCarousel = ({
  rawCarouselData,
  session,
}: {
  rawCarouselData: Promise<CAROUSEL_POSTS_QUERYResult>;
  session: Session | null;
}) => {
  let carouselData: (AboutBlog | CAROUSEL_POSTS_QUERYResult[0])[] =
    use(rawCarouselData);
  if (!session?.user) {
    carouselData = [aboutBlog, ...carouselData];
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [play, setPlay] = useState(true);
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

  useEffect(() => {
    if (!session?.user && currentIndex != 0) {
      setCurrentIndex(0);
    }
  }, [session]);

  const router = useRouter();

  if (carouselData.length === 0) {
    return <div>No Carousel Data</div>;
  }

  return (
    <section className="mt-10 bg-white p-3 pb-5 rounded-[32px] sm:p-5 lg:grid grid-cols-[60%_40%] carousel-hover-effect">
      <div className="relative rounded-3xl">
        <div className="flex rounded-3xl relative overflow-hidden">
          {carouselData.map((item, index) => {
            let position = "";
            if (currentIndex > index) {
              position = "prev-slide";
            } else if (currentIndex < index) {
              position = "next-slide";
            }
            let src = "";
            if (item._type === "post") {
              src = item.image
                ? urlFor(item.image)?.width(1260).height(1240).url()
                : "/no-image.jpg";
            } else {
              src = (item as AboutBlog).image;
            }
            return (
              <Image
                onClick={() => {
                  item._type === "post"
                    ? router.push(
                        `/posts/${(item as CAROUSEL_POSTS_QUERYResult[0]).slug?.current}`
                      )
                    : null;
                }}
                key={item.title}
                src={src}
                width={1260}
                height={1240}
                alt={item.title || "no title"}
                className={`rounded-3xl ${item._type === "post" ? "cursor-pointer hover:scale-125" : ""} custom-transition ${position} flex-none h-[45vh] sm:h-[60vh] xs:h-[48vh] max-h-[420px] object-cover lg:h-[470px] lg:max-h-none`}
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
      <TextSection currentItem={carouselData[currentIndex]} />
    </section>
  );
};
export default HeroCarousel;

const TextSection = ({
  currentItem,
}: {
  currentItem: AboutBlog | CAROUSEL_POSTS_QUERYResult[0];
}) => {
  if (currentItem._type === "about-blog") {
    const currentItemData = currentItem as unknown as AboutBlog;
    return (
      <article className="mt-5 lg:mt-16 lg:px-8 max-xl:lg:mb-10 text-center lg:text-left">
        <header className="flex gap-3 items-center justify-center lg:justify-start">
          <h1>{currentItemData.title}</h1>
          <Image
            src="/wave.gif"
            width={40}
            height={40}
            className="inline-block"
            alt="wave"
          />
        </header>
        <p className="mt-4 lg:mt-8">{currentItemData.body}</p>
        <div className="mt-2 space-x-5 lg:mt-8">
          {currentItemData.socials.map(({ icon, link, name }) => (
            <Link href={link} key={name}>
              <Image
                src={icon}
                width={512}
                height={512}
                className={`inline-block custom-transition hover:scale-75  ${name === "youtube" ? "w-9" : "w-[26px]"}`}
                alt={name}
              />
            </Link>
          ))}
        </div>
      </article>
    );
  } else {
    const currentItemData =
      currentItem as unknown as CAROUSEL_POSTS_QUERYResult[0];
    const categoryColor =
      currentItemData.category?.tailwindColor || "bg-purple-400";

    return (
      <article className="mt-5 lg:mt-10 lg:px-8">
        <h1>{formatTitle(currentItemData.title, 50)}</h1>
        <div className="flex mt-5 items-center justify-between">
          <span className={`${categoryColor} py-[2px] px-3 rounded-full`}>
            {currentItemData?.category?.name}
          </span>
          <span className="font-semibold bg-cyan-200 py-[2px] px-3 rounded-full">
            {formatDate(currentItemData?.publishedAt || "")}
          </span>
        </div>
        <p className="mt-4 lg:mt-5">
          {Array.isArray(currentItemData?.body) &&
            formatPreview(currentItemData?.body, 200)}
          <span className="text-3xl/[0px]">&#8230;</span>
          <button type="button" className="block mt-3">
            <Link
              href={`/posts/${currentItemData?.slug?.current}`}
              className="hover:text-secondary group custom-transition font-bold"
            >
              read more{" "}
              <MoveRight className="inline-block group-hover:text-secondary custom-transition" />{" "}
            </Link>
          </button>
        </p>
      </article>
    );
  }
};
