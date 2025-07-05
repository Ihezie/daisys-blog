import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY, CAROUSEL_POSTS_QUERY } from "@/sanity/lib/queries";
import { aboutBlog, AboutBlog } from "../data";
import { CAROUSEL_POSTS_QUERYResult } from "@/sanity.types";
import { auth } from "@/auth";

export default async function Home() {
  const categories = await client.fetch(CATEGORIES_QUERY, {});
  const carouselPosts = await client.fetch(
    CAROUSEL_POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );

  const session = await auth();

  let carouselData: (AboutBlog | CAROUSEL_POSTS_QUERYResult[0])[];

  if (session?.user) {
    carouselData = carouselPosts;
  } else {
    carouselData = [aboutBlog, ...carouselPosts];
  }

  return (
    <main>
      <HeroCarousel session={session} carouselData={carouselData} />
      <CategoryCarousel categories={categories} />
    </main>
  );
}
