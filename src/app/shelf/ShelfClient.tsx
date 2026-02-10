"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ShelfCard from "@/components/shelf/ShelfCard";
import ShelfModal from "@/components/shelf/ShelfModal";
import { ShelfItem } from "@/types";

/* Seeded pseudo-random for deterministic scatter */
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Auto-distribute items with an organic scattered "tossed on desk" feel */
function autoLayout(items: ShelfItem[]): ShelfItem[] {
  const allDefault = items.every(
    (item) => item.position.x <= 1 && item.position.y <= 1
  );

  if (!allDefault) return items;

  const rand = seededRand(42);
  const placed: { x: number; y: number }[] = [];

  return items.map((item, i) => {
    // Try to place with some overlap allowed but not total stacking
    let bestX = 10 + rand() * 72;
    let bestY = 5 + rand() * 70;

    // Attempt a few placements, pick the one with best spacing
    for (let attempt = 0; attempt < 12; attempt++) {
      const cx = 6 + rand() * 78;
      const cy = 4 + rand() * 74;
      let minDist = Infinity;
      for (const p of placed) {
        const d = Math.sqrt((cx - p.x) ** 2 + (cy - p.y) ** 2);
        if (d < minDist) minDist = d;
      }
      // Accept if spaced at least 12% apart (allows light overlap)
      if (placed.length === 0 || minDist > 12) {
        bestX = cx;
        bestY = cy;
        break;
      }
      // Otherwise keep the best spaced attempt
      if (minDist > 8) {
        bestX = cx;
        bestY = cy;
      }
    }

    placed.push({ x: bestX, y: bestY });

    // Organic rotations: -12 to +12 degrees
    const rotation = item.rotation ?? Math.round((rand() - 0.5) * 24);

    return {
      ...item,
      position: { x: bestX, y: bestY },
      rotation,
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

        {/* Mobile — grid with white card frames */}
        <div className="md:hidden grid grid-cols-3 gap-4 py-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.92 }}
            >
              <div className="bg-white rounded-sm shadow-md p-1 w-20 h-20">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-[1px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-[1px]">
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-charcoal/40">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <ShelfModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageTransition>
  );
}
