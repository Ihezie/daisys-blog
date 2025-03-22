"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BackButton = () => {
  return (
    <Link
      href="/posts"
      className="flex w-max items-center gap-1 hover:bg-secondary-800 custom-transition rounded-full py-1 pr-3 pl-1 mb-5"
    >
      <ChevronLeft size={28} />
      <span className="font-semibold">Back</span>
    </Link>
  );
};

export default BackButton;
