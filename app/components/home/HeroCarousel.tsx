"use client";

import Image from "next/image";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { type CarouselApi } from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  const router = useRouter();

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!session?.user && current != 0) {
      setCurrent(0);
      if (api) {
        api.scrollTo(0);
      }
    }
  }, [session, api, current]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (carouselData.length === 0) {
    return <div>No Carousel Data</div>;
  }

  return (
    <section className="mt-10 bg-white sm:pb-5 rounded-[32px] sm:p-5 lg:grid grid-cols-[60%_40%] carousel-hover-effect">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={setApi}
        className="relative rounded-3xl"
      >
        <CarouselIndicators
          amount={carouselData?.length}
          currentIndex={current}
        />
        <CarouselContent>
          {carouselData.map((item) => {
            let src = "";
            if (item._type === "post") {
              src = item.image
                ? urlFor(item.image)?.width(1260).height(1240).url()
                : "/no-image.jpg";
            } else {
              src = (item as AboutBlog).image;
            }
            return (
              <CarouselItem
                key={item.title}
                onClick={() => {
                  if (item._type === "post") {
                    router.push(
                      `/posts/${(item as CAROUSEL_POSTS_QUERYResult[0]).slug?.current}`
                    );
                  }
                }}
              >
                <Image
                  src={src}
                  width={1260}
                  height={1240}
                  alt={item.title || "no title"}
                  className={` ${item._type === "post" ? "cursor-pointer sm:hover:scale-125" : ""} custom-transition flex-none h-[60vh] max-h-[330px] xs:max-h-[420px] object-cover lg:h-[470px] lg:max-h-none`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      <TextSection currentItem={carouselData[current]} />
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
      <article className="mt-5 p-3 sm:p-0 lg:mt-16 lg:px-8 max-xl:lg:mb-10 text-center lg:text-left">
        <header className="flex gap-3 items-center justify-center lg:justify-start">
          <h1>{currentItemData.title}</h1>
          <Image
            unoptimized
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
      <article className="mt-5 p-3 sm:p-0 lg:mt-10 lg:px-8">
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
