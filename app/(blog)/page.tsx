import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY, CAROUSEL_POSTS_QUERY } from "@/sanity/lib/queries";
import { aboutBlog, AboutBlog } from "../data";
import { CAROUSEL_POSTS_QUERYResult } from "@/sanity.types";

export default async function Home() {
  const categories = await client.fetch(
    CATEGORIES_QUERY,
    {},
    {
      cache: "force-cache",
    }
  );
  const carouselPosts = await client.fetch(
    CAROUSEL_POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );

  const carouselData: (AboutBlog | CAROUSEL_POSTS_QUERYResult[0])[] = [
    aboutBlog,
    ...carouselPosts,
  ];

  return (
    <main className="">
      <HeroCarousel carouselData={carouselData} />
      <CategoryCarousel categories={categories} />
    </main>
  );
}
