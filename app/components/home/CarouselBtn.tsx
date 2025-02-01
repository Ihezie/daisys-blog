import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const CarouselBtn = ({
  handleClick = () => {},
  icon,
}: {
  handleClick?: () => void;
  icon: "left" | "right" | "play" | "pause";
}) => {
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.8 }}
      className="bg-gray-300 hover:bg-secondary-800 size-10 flex justify-center items-center rounded-full cursor-pointer transition-colors duration-500"
    >
      {icon === "play" && <Play size={28} />}
      {icon === "pause" && <Pause size={28} />}
      {icon === "left" && <ChevronLeft size={32} />}
      {icon === "right" && <ChevronRight size={32} />}
    </motion.button>
  );
};

export default CarouselBtn;
