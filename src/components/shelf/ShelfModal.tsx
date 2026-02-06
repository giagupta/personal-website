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
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xs bg-white rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {/* Object */}
            <div className="pt-10 pb-6 flex flex-col items-center bg-white">
              {item.imageUrl ? (
                <motion.img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                />
              ) : (
                <motion.span
                  className="text-7xl"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                >
                  {item.emoji}
                </motion.span>
              )}
            </div>

            {/* Text */}
            <div className="px-6 pb-7">
              <h2 className="text-lg font-medium text-charcoal text-center">
                {item.name}
              </h2>
              <p className="mt-0.5 text-[10px] text-charcoal/35 tracking-[0.2em] uppercase text-center">
                {item.concept}
              </p>

              <div className="my-4 border-t border-charcoal/6" />

              <p className="text-sm text-charcoal/55 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-charcoal/25 hover:text-charcoal/60 hover:bg-charcoal/5 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
