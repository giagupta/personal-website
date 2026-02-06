"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ShelfCard from "@/components/shelf/ShelfCard";
import ShelfModal from "@/components/shelf/ShelfModal";
import { ShelfItem } from "@/types";

/* Auto-distribute items if positions are all clustered at 0,0 */
function autoLayout(items: ShelfItem[]): ShelfItem[] {
  const allDefault = items.every(
    (item) => item.position.x <= 1 && item.position.y <= 1
  );

  if (!allDefault) return items;

  // Scatter items across the canvas using a grid-ish pattern with jitter
  const cols = Math.ceil(Math.sqrt(items.length * 1.5));
  const rows = Math.ceil(items.length / cols);
  const cellW = 80 / cols; // percentage of canvas width
  const cellH = 75 / rows; // percentage of canvas height

  return items.map((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Center in cell with some randomish offset based on index
    const jitterX = ((i * 7 + 3) % 11 - 5) * 1.5;
    const jitterY = ((i * 13 + 5) % 11 - 5) * 1.5;
    return {
      ...item,
      position: {
        x: 8 + col * cellW + cellW / 2 + jitterX,
        y: 5 + row * cellH + cellH / 2 + jitterY,
      },
      rotation: item.rotation || ((i * 17) % 13 - 6),
    };
  });
}

export default function ShelfClient({ items }: { items: ShelfItem[] }) {
  const [selectedItem, setSelectedItem] = useState<ShelfItem | null>(null);
  const layoutItems = useMemo(() => autoLayout(items), [items]);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-charcoal">
            Shelf
          </h1>
          <p className="mt-1.5 text-xs text-charcoal/30">
            {items.length} objects &middot; click to explore
          </p>
        </motion.div>

        {/* Freeform canvas — desktop */}
        <div
          className="hidden md:block relative w-full"
          style={{ height: "70vh", minHeight: 500 }}
        >
          {layoutItems.map((item, i) => (
            <ShelfCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Mobile — grid */}
        <div className="md:hidden grid grid-cols-3 gap-4 py-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex flex-col items-center gap-1.5 py-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.92 }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-14 object-contain drop-shadow-sm"
                />
              ) : (
                <span className="text-4xl">{item.emoji}</span>
              )}
              <span className="text-[10px] text-charcoal/40">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <ShelfModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageTransition>
  );
}
