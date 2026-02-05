"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ShelfCard from "@/components/shelf/ShelfCard";
import ShelfModal from "@/components/shelf/ShelfModal";
import { ShelfItem } from "@/types";

export default function ShelfClient({ items }: { items: ShelfItem[] }) {
  const [selectedItem, setSelectedItem] = useState<ShelfItem | null>(null);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light italic text-charcoal">
            Gia&apos;s Shelf
          </h1>
          <p className="mt-2 text-sm text-charcoal/40 max-w-md">
            A collection of objects and the ideas they carry.{" "}
            <span className="inline-flex items-center gap-1">
              <span className="border border-charcoal/30 rounded-sm px-1.5 py-0 text-[11px] text-charcoal/50">
                Click
              </span>{" "}
              on any object to learn more.
            </span>
          </p>
        </motion.div>

        {/* Freeform canvas — desktop */}
        <div
          className="hidden md:block relative w-full"
          style={{ height: "75vh", minHeight: 600 }}
        >
          {items.map((item, i) => (
            <ShelfCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden flex flex-wrap justify-center gap-6 py-6">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileTap={{ scale: 0.92 }}
              style={{ transform: `rotate(${item.rotation ?? 0}deg)` }}
            >
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full border border-charcoal/30 bg-cream text-[9px] flex items-center justify-center text-charcoal/50 z-10">
                {i + 1}
              </span>
              <span
                className={
                  item.size === "lg"
                    ? "text-6xl"
                    : item.size === "md"
                    ? "text-5xl"
                    : "text-4xl"
                }
              >
                {item.emoji}
              </span>
              <span className="mt-1 text-[10px] font-serif italic text-charcoal/50">
                {item.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Bottom label */}
        <motion.div
          className="hidden md:flex items-end justify-between mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-[11px] text-charcoal/30 tracking-wide">
            {items.length} objects
          </p>
          <p className="text-[11px] text-charcoal/30 font-serif italic">
            Explore
          </p>
        </motion.div>
      </div>

      <ShelfModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageTransition>
  );
}
