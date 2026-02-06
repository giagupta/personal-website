"use client";

import { motion } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfCardProps {
  item: ShelfItem;
  index: number;
  onClick: () => void;
}

const sizeMap = {
  sm: { wrapper: "w-16 h-16", image: 56 },
  md: { wrapper: "w-24 h-24", image: 80 },
  lg: { wrapper: "w-32 h-32", image: 110 },
};

export default function ShelfCard({ item, index, onClick }: ShelfCardProps) {
  const s = sizeMap[item.size];
  const rotation = item.rotation ?? 0;

  return (
    <motion.button
      onClick={onClick}
      className="group absolute cursor-pointer select-none"
      style={{
        left: `${item.position.x}%`,
        top: `${item.position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{
        delay: 0.05 * index,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`${s.wrapper} flex items-center justify-center`}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="max-w-full max-h-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all duration-200"
            style={{ width: s.image, height: s.image }}
          />
        ) : (
          <span
            className={`${item.size === "lg" ? "text-7xl" : item.size === "md" ? "text-5xl" : "text-4xl"} drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-200`}
          >
            {item.emoji}
          </span>
        )}
      </div>

      {/* Name — only on hover */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        <span className="text-[10px] text-charcoal/50 bg-cream/90 px-1.5 py-0.5 rounded">
          {item.name}
        </span>
      </div>
    </motion.button>
  );
}
