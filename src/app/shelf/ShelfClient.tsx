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

/* Organic scatter layout */
function autoLayout(items: ShelfItem[]): ShelfItem[] {
  const allDefault = items.every(
    (item) => item.position.x <= 1 && item.position.y <= 1
  );
  if (!allDefault) return items;

  const rand = seededRand(42);
  const placed: { x: number; y: number }[] = [];

  return items.map((item) => {
    let bestX = 10 + rand() * 75;
    let bestY = 8 + rand() * 72;

    for (let attempt = 0; attempt < 15; attempt++) {
      const cx = 8 + rand() * 78;
      const cy = 6 + rand() * 76;
      let minDist = Infinity;
      for (const p of placed) {
        const d = Math.sqrt((cx - p.x) ** 2 + (cy - p.y) ** 2);
        if (d < minDist) minDist = d;
      }
      if (placed.length === 0 || minDist > 14) {
        bestX = cx;
        bestY = cy;
        break;
      }
      if (minDist > 10) {
        bestX = cx;
        bestY = cy;
      }
    }

    placed.push({ x: bestX, y: bestY });
    return { ...item, position: { x: bestX, y: bestY } };
  });
}

/* Sidebar tag colors */
const sidebarTags = [
  { label: "Blue", color: "#007AFF" },
  { label: "Purple", color: "#AF52DE" },
  { label: "Gray", color: "#8E8E93" },
  { label: "Red", color: "#FF3B30" },
];

export default function ShelfClient({ items }: { items: ShelfItem[] }) {
  const [selectedItem, setSelectedItem] = useState<ShelfItem | null>(null);
  const layoutItems = useMemo(() => autoLayout(items), [items]);

  const sf = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif';

  return (
    <PageTransition>
      <div className="flex items-start justify-center min-h-screen px-3 py-6 md:px-6 md:py-10">
        <motion.div
          className="w-full max-w-5xl rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.06)]"
          style={{ fontFamily: sf }}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 24 }}
        >
          {/* ===== Title bar ===== */}
          <div className="h-[52px] bg-gradient-to-b from-[#E8E6E3] to-[#DDDBD8] flex items-center px-4 border-b border-black/[0.06] relative">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>

            {/* Nav arrows + title */}
            <div className="flex items-center gap-3 ml-5">
              <div className="flex items-center gap-1 text-gray-400">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" className="opacity-40">
                  <path d="M8 1L2 7L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" className="opacity-40">
                  <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-gray-800 tracking-[-0.01em]">Shelf</span>
            </div>

            {/* Toolbar icons (decorative) */}
            <div className="hidden md:flex items-center gap-3 ml-auto text-gray-400">
              {/* Grid view icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              {/* List view icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="1" y1="3" x2="15" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="1" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {/* Search icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* ===== Body: sidebar + content ===== */}
          <div className="flex bg-white" style={{ minHeight: "70vh" }}>
            {/* Sidebar — hidden on mobile */}
            <div className="hidden md:flex flex-col w-[160px] bg-[#F5F3F0] border-r border-black/[0.05] py-4 px-3 flex-shrink-0">
              {/* Favorites */}
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                Favorites
              </span>
              <div className="flex flex-col gap-0.5 mb-4">
                {[
                  { icon: "📡", label: "AirDrop" },
                  { icon: "🕐", label: "Recents", active: true },
                  { icon: "📂", label: "Downloads" },
                ].map((fav) => (
                  <div
                    key={fav.label}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-[12px] ${
                      fav.active
                        ? "bg-blue-500/10 text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    <span className="text-sm">{fav.icon}</span>
                    {fav.label}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">
                Tags
              </span>
              <div className="flex flex-col gap-0.5">
                {sidebarTags.map((tag) => (
                  <div
                    key={tag.label}
                    className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-gray-600"
                  >
                    <span
                      className="w-[10px] h-[10px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: tag.color }}
                    />
                    {tag.label}
                  </div>
                ))}
                <div className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-gray-600">
                  <span className="w-[10px] h-[10px] rounded-full flex-shrink-0 border border-gray-300" />
                  All Tags...
                </div>
              </div>
            </div>

            {/* Content area — scattered items */}
            <div className="flex-1 relative overflow-hidden" style={{ minHeight: "65vh" }}>
              {/* Scale wrapper for mobile */}
              <div className="absolute inset-0 origin-top-left scale-[0.6] sm:scale-[0.8] md:scale-100 w-[167%] h-[167%] sm:w-[125%] sm:h-[125%] md:w-full md:h-full">
                {layoutItems.map((item, i) => (
                  <ShelfCard
                    key={item.id}
                    item={item}
                    index={i}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ShelfModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </PageTransition>
  );
}
