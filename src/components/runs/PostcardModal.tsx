"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Run } from "@/types";

interface PostcardModalProps {
  run: Run | null;
  onClose: () => void;
}

export default function PostcardModal({ run, onClose }: PostcardModalProps) {
  return (
    <AnimatePresence>
      {run && (
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

          {/* Postcard */}
          <motion.div
            className="relative w-full max-w-2xl bg-cream rounded-sm postcard-shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Top photo section */}
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img
                src={run.photoUrl}
                alt={run.location}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/60 to-transparent" />
            </div>

            {/* Postcard content */}
            <div className="p-6 md:p-8">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-warm-gray tracking-widest uppercase">
                    {run.date}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl md:text-3xl font-medium text-charcoal">
                    {run.location}
                  </h2>
                  <p className="mt-1 text-sm text-tan font-medium">
                    {run.distance}
                  </p>
                </div>

                {/* Stamp */}
                <div className="flex-shrink-0 ml-4">
                  <div className="stamp-border p-1">
                    <div
                      className="w-16 h-20 flex flex-col items-center justify-center text-center border-2 border-dashed"
                      style={{ borderColor: run.color }}
                    >
                      <span className="text-2xl">🏃</span>
                      <span
                        className="text-[8px] font-bold mt-1 tracking-wider uppercase"
                        style={{ color: run.color }}
                      >
                        Postale
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-tan/30" />

              {/* Thoughts */}
              <p className="font-serif text-lg italic text-charcoal/80 leading-relaxed">
                &ldquo;{run.thoughts}&rdquo;
              </p>

              {/* Decorative postmark */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-tan/40 flex items-center justify-center">
                  <span className="text-xs text-tan">✦</span>
                </div>
                <div className="flex-1 border-t border-dashed border-tan/30" />
                <span className="text-xs text-warm-gray/50 tracking-widest">
                  POST CARD
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-cream/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-cream transition-colors"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
