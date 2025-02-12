import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
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
