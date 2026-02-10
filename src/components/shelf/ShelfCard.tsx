"use client";

import { motion } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfCardProps {
  item: ShelfItem;
  index: number;
  onClick: () => void;
}

const sizeMap = {
  sm: { w: 90, h: 90 },
  md: { w: 120, h: 130 },
  lg: { w: 155, h: 165 },
};

export default function ShelfCard({ item, index, onClick }: ShelfCardProps) {
  const s = sizeMap[item.size];
  const rotation = item.rotation ?? 0;

  return (
    <motion.button
      onClick={onClick}
      className="group absolute cursor-pointer select-none -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.7, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{
        delay: 0.04 * index,
        duration: 0.5,
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.96 }}
    >
      {/* White card frame */}
      <div
        className="bg-white rounded-sm shadow-md group-hover:shadow-xl transition-shadow duration-200 p-1.5"
        style={{ width: s.w, height: s.h }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-[1px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-[1px]">
            <span
              className={`${
                item.size === "lg"
                  ? "text-6xl"
                  : item.size === "md"
                  ? "text-5xl"
                  : "text-3xl"
              }`}
            >
              {item.emoji}
            </span>
          </div>
        )}
      </div>

      {/* Label — always visible */}
      <div className="mt-1.5 flex items-center gap-1 justify-center">
        <span className="text-[10px] text-charcoal/40 group-hover:text-charcoal/70 transition-colors whitespace-nowrap">
          {item.name}
        </span>
      </div>
    </motion.button>
  );
}
