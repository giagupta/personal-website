"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ShelfCard from "@/components/shelf/ShelfCard";
import ShelfModal from "@/components/shelf/ShelfModal";
import { shelfItems } from "@/data/shelf";
import { ShelfItem } from "@/types";

export default function ShelfPage() {
  const [selectedItem, setSelectedItem] = useState<ShelfItem | null>(null);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">
            Shelf
          </h1>
          <p className="mt-3 text-warm-gray text-sm leading-relaxed max-w-lg">
            A collection of objects and the ideas they carry. Each one holds a
            lesson worth revisiting. Click any object to learn more.
          </p>
          <div className="mt-4 w-12 h-[1px] bg-tan" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {shelfItems.map((item, i) => (
            <ShelfCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ShelfModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageTransition>
  );
}
