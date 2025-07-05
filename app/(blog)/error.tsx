"use client";

import { CloudLightning } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <h2 className="text-center">Something went wrong!</h2>
      <CloudLightning size={50} className="mx-auto mt-3"/>
      <button
        className="text-secondary block px-5 w-auto font-oswald uppercase py-[2px] text-center border-2 border-secondary mx-auto rounded-full text-[13px] font-bold mt-4 hover:bg-secondary hover:text-white duration-150 sm:text-base sm:py-1"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
