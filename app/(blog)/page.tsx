import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import { client } from "@/sanity/lib/client";
import {
  CATEGORIES_QUERY,
  CAROUSEL_POSTS_QUERY,
  TOP_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { auth } from "@/auth";
import { Suspense } from "react";
import HomeCarouselSkeleton from "../components/loading_skeletons/HomeCarouselSkeleton";
import CategoriesCarouselSkeleton from "../components/loading_skeletons/CategoriesCarouselSkeleton";
import TopPosts from "../components/home/TopPosts";
import TopPostsSkeleton from "../components/loading_skeletons/TopPostsSkeleton";

export default async function Home() {
  const categories = client.fetch(CATEGORIES_QUERY, {});
  const carouselPosts = client.fetch(
    CAROUSEL_POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );
  const topPosts = client.fetch(
    TOP_POSTS_QUERY,
    {},
    { next: { revalidate: 30 } }
  );
  const session = await auth();
  return (
    <main>
      <Suspense fallback={<HomeCarouselSkeleton />}>
        <HeroCarousel session={session} rawCarouselData={carouselPosts} />
      </Suspense>
      <Suspense fallback={<CategoriesCarouselSkeleton />}>
        <CategoryCarousel rawCategories={categories} />
      </Suspense>
      <Suspense fallback={<TopPostsSkeleton />}>
        <TopPosts rawTopPosts={topPosts} session={session} />
      </Suspense>
    </main>
  );
}
