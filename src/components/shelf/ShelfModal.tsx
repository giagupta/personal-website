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
            className="absolute inset-0 bg-cream/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-white rounded-sm overflow-hidden"
            style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.12)" }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Top section with emoji */}
            <div className="pt-10 pb-6 flex flex-col items-center text-center bg-white">
              <motion.span
                className="text-8xl"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
              >
                {item.emoji}
              </motion.span>
            </div>

            {/* Text section */}
            <div className="px-8 pb-8">
              <h2 className="font-serif text-2xl text-charcoal text-center">
                {item.name}
              </h2>
              <p className="mt-1 text-[11px] text-charcoal/40 tracking-[0.2em] uppercase text-center">
                {item.concept}
              </p>

              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 border-t border-charcoal/10" />
                <span className="text-[10px] text-charcoal/20">&#9679;</span>
                <div className="flex-1 border-t border-charcoal/10" />
              </div>

              <p className="text-sm text-charcoal/60 leading-relaxed font-light">
                {item.description}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-charcoal/30 hover:text-charcoal/70 hover:bg-charcoal/5 transition-colors text-lg"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
