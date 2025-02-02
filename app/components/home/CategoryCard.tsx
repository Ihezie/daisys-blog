import { Category } from "@/app/data";
import Image from "next/image";

const CategoryCard = ({ name, info }: { name: string; info: Category }) => {
  return (
    <div className="h-72 rounded-3xl bg-white p-2 hover:cursor-pointer hover:scale-[1.08] hover:shadow-[0_8px_20px_rgb(0,0,0,0.12)] w-[160px] xs:w-[180px] lg:flex-none">
      <div className="relative h-[85%]">
        <Image
          className="object-cover rounded-[20px] relative"
          src={info.image}
          alt={name}
          fill={true}
        />
      </div>
      <h3 className="text-center capitalize mt-2 text-lg flex items-center justify-center gap-2">
        <Image
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
