"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShelfItem } from "@/types";

interface ShelfModalProps {
  item: ShelfItem | null;
  onClose: () => void;
}

export default function ShelfModal({ item, onClose }: ShelfModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-cream rounded-lg postcard-shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Colored header */}
            <div
              className="p-8 flex flex-col items-center text-center"
              style={{ backgroundColor: item.bgColor }}
            >
              <motion.span
                className="text-7xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 15 }}
              >
                {item.emoji}
              </motion.span>
              <h2 className="mt-4 font-serif text-2xl font-medium text-charcoal">
                {item.name}
              </h2>
              <p className="mt-1 text-xs text-charcoal/50 tracking-widest uppercase">
                {item.concept}
              </p>
            </div>

            {/* Description */}
            <div className="p-6 md:p-8">
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 border-t border-tan/30" />
                <span className="text-xs text-warm-gray/50 tracking-widest">✦</span>
                <div className="flex-1 border-t border-tan/30" />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-white/90 transition-colors"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
