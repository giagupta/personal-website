"use client";

import { motion } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfCardProps {
  item: ShelfItem;
  index: number;
  onClick: () => void;
}

export default function ShelfCard({ item, index, onClick }: ShelfCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 cursor-pointer select-none"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.03 * index, duration: 0.35 }}
      whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Thumbnail */}
      <div className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50/80">
            <span className="text-5xl">{item.emoji}</span>
          </div>
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] leading-tight text-charcoal/50 group-hover:text-charcoal/80 transition-colors max-w-[120px] truncate">
        {item.name}
      </span>
    </motion.button>
  );
}
