"use client";
import { useEffect, useState } from "react";
const AnimatedHamburger = ({ isVisible }: { isVisible: boolean }) => {
  const [userInteractionOccurred, setUserInteractionOccurred] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setUserInteractionOccurred(true);
    }
  }, [isVisible]);

  return (
    <span
      className={`flex flex-col gap-1.5 w-6 relative ${
        isVisible ? "close" : "open"
      } ${userInteractionOccurred ? "can-animate" : ""}`}
    >
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="inline-block border origin-center border-black w-6 rounded-full bg-black"
        ></span>
      ))}
    </span>
  );
};
export default AnimatedHamburger;
