import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const Post = () => {
  return (
    <div className="w-[280px] h-[400px] mx-auto bg-white rounded-3xl">
      <Image
        src="/woman-skincare.jpg"
        width={300}
        height={200}
        alt="woman applying serum"
        className="rounded-t-3xl h-[47%] object-cover"
      />
      <div className="px-5 pt-5">
        <div className="flex justify-between text-sm font-semibold">
          <span className="py-[2px] px-3 rounded-full bg-orange-400">
            skincare
          </span>
          <span className="bg-cyan-200 py-[2px] px-3 rounded-full">
            12, Nov 2021
          </span>
        </div>
        <h3 className="text-lg capitalize mt-3">
          My favorite skincare products
        </h3>
        <p className="mt-2 leading-tight text-slate-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime ipsum
          delectus pariatur eaque
          <span className="text-3xl/[0px]">&#8230;</span>
          <button type="button" className="block mt-1">
            <Link href="" className="hover:text-secondary group text-black">
              read more{" "}
              <MoveRight className="inline-block group-hover:text-secondary transition-none" />{" "}
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};
export default Post;
