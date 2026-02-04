"use client";

import { motion } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfCardProps {
  item: ShelfItem;
  index: number;
  onClick: () => void;
}

const sizeMap = {
  sm: { emoji: "text-5xl", wrapper: "w-20 h-20", image: 60 },
  md: { emoji: "text-7xl", wrapper: "w-28 h-28", image: 90 },
  lg: { emoji: "text-8xl", wrapper: "w-36 h-36", image: 120 },
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
        delay: 0.08 * index,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Circled number */}
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full border border-charcoal/30 bg-cream text-[10px] flex items-center justify-center text-charcoal/60 font-sans z-10">
        {index + 1}
      </span>

      {/* Object */}
      <div className={`${s.wrapper} flex items-center justify-center`}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="max-w-full max-h-full object-contain drop-shadow-md"
            style={{ width: s.image, height: s.image }}
          />
        ) : (
          <span className={`${s.emoji} drop-shadow-sm transition-transform duration-200 group-hover:drop-shadow-lg`}>
            {item.emoji}
          </span>
        )}
      </div>

      {/* Hover label */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        <span className="text-[11px] font-serif italic text-charcoal/70 bg-cream/90 px-2 py-0.5 rounded">
          {item.name}
        </span>
      </div>
    </motion.button>
  );
}
