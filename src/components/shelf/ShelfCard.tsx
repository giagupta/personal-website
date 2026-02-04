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
      className="group relative text-left w-full rounded-lg overflow-hidden postcard-shadow hover:postcard-shadow-lg transition-shadow"
      style={{ backgroundColor: item.bgColor }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-6 flex flex-col items-center text-center min-h-[180px] justify-center">
        <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {item.emoji}
        </span>
        <h3 className="font-serif text-lg font-medium text-charcoal">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-charcoal/50 tracking-widest uppercase">
          {item.concept}
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300 flex items-end justify-center pointer-events-none">
        <span className="text-xs text-charcoal/0 group-hover:text-charcoal/70 tracking-wider uppercase pb-4 transition-colors duration-300">
          Click to learn more
        </span>
      </div>
    </motion.button>
  );
}
