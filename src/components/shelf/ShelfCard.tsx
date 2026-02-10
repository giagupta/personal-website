"use client";

import { motion } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfCardProps {
  item: ShelfItem;
  index: number;
  onClick: () => void;
}

const sizeMap = {
  sm: { w: 100, h: 100 },
  md: { w: 130, h: 145 },
  lg: { w: 150, h: 170 },
};

export default function ShelfCard({ item, index, onClick }: ShelfCardProps) {
  const s = sizeMap[item.size];

  return (
    <motion.button
      onClick={onClick}
      className="group absolute cursor-pointer select-none -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.03 * index,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: 1.06,
        zIndex: 50,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Thumbnail with subtle shadow */}
      <div
        className="rounded-md overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.08)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-200"
        style={{ width: s.w, height: s.h }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <span
              className={`${
                item.size === "lg"
                  ? "text-6xl"
                  : item.size === "md"
                  ? "text-5xl"
                  : "text-4xl"
              }`}
            >
              {item.emoji}
            </span>
          </div>
        )}
      </div>

      {/* Label with pink tag dot */}
      <div className="mt-2 flex items-center gap-1.5 justify-center">
        <span className="w-[7px] h-[7px] rounded-full bg-pink-400 flex-shrink-0" />
        <span className="text-[11px] leading-tight text-gray-600 group-hover:text-gray-900 transition-colors max-w-[130px] text-left"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
        >
          {item.name}
        </span>
      </div>
    </motion.button>
  );
}
