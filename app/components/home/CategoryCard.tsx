import { Category } from "@/app/data";
import Image from "next/image";

const CategoryCard = ({ name, info }: { name: string; info: Category }) => {
  return (
    <div className="h-72 custom-transition rounded-3xl bg-white p-2 hover:cursor-pointer hover:scale-[1.08] hover:shadow-[0_8px_20px_rgb(0,0,0,0.12)] w-[160px] xs:w-[180px] lg:flex-none">
      <Image
        className="object-cover rounded-[20px] relative h-[85%]"
        src={info.image}
        alt={name}
        width={164}
        height={231}
      />
      <h3 className="text-center capitalize mt-2 text-lg flex items-center justify-center gap-2">
        <Image
          unoptimized
          src={info.animatedIcon.src}
          width={30}
          height={30}
          className="inline-block"
          alt={info.animatedIcon.alt}
        />
        {name}
      </h3>
    </div>
  );
};
export default CategoryCard;
