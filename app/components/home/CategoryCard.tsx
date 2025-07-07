import Image from "next/image";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const CategoryCard = ({
  category,
}: {
  category: CATEGORIES_QUERYResult[0];
}) => {
  const categoryImageUrl = category.image
    ? urlFor(category.image)?.width(600).height(900).url()
    : null;
  const animatedIconUrl = category.animatedIcon
    ? urlFor(category.animatedIcon)?.width(500).height(500).url()
    : null;
  return (
    <div className="h-60 custom-transition rounded-3xl bg-white p-[7px] hover:scale-[1.08] hover:shadow-[0_8px_20px_rgb(0,0,0,0.12)] w-[160px] lg:flex-none">
      <Link href={`/posts?filter=${category?.name}`}>
        <Image
          className="object-cover rounded-[20px] relative h-[85%]"
          src={categoryImageUrl || "/no-image.jpg"}
          alt={category.name || "no-image"}
          width={164}
          height={231}
        />
        <h3 className="text-center capitalize mt-2 flex items-center justify-center gap-2">
          {animatedIconUrl && (
            <Image
              unoptimized
              src={animatedIconUrl}
              width={30}
              height={30}
              className="inline-block size-7"
              alt="animated icon"
            />
          )}
          {category?.name}
        </h3>
      </Link>
    </div>
  );
};
export default CategoryCard;
