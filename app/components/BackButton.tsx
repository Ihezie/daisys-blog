"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="flex items-center gap-1 hover:bg-secondary-800 custom-transition rounded-full py-1 pr-3 pl-1 mb-5"
    >
      <ChevronLeft size={28} />
      <span className="font-semibold mt-[3px]">Back</span>
    </button>
  );
};

export default BackButton;
