import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

export default async function Home() {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type == "category" && defined(_id)]{_id, name, animatedIcon, tailwindColor, image}`
  );

  const categories = await client.fetch(
    CATEGORIES_QUERY,
    {},
    {
      cache: "force-cache",
    }
  );

  return (
    <main className="">
      <HeroCarousel />
      <CategoryCarousel categories={categories} />
    </main>
  );
}
