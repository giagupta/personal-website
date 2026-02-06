"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Run } from "@/types";

interface PostcardModalProps {
  run: Run | null;
  onClose: () => void;
}

const linkIcons: Record<string, string> = {
  podcast: "headphones",
  article: "bookmark",
  music: "music",
  other: "link",
};

function LinkIcon({ type }: { type: string }) {
  const icon = linkIcons[type] || linkIcons.other;
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-charcoal/5 text-[10px] text-charcoal/50 flex-shrink-0">
      {icon === "headphones" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )}
      {icon === "bookmark" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )}
      {icon === "music" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
      {icon === "link" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )}
    </span>
  );
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
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Photo */}
            <div className="relative h-48 md:h-56 overflow-hidden">
              <img
                src={run.photoUrl}
                alt={run.location}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Location overlay */}
              <div className="absolute bottom-4 left-5">
                <h2 className="font-sans text-xl md:text-2xl font-medium text-white">
                  {run.location}
                </h2>
                <p className="text-xs text-white/70 mt-0.5">
                  {run.date} &middot; {run.distance}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              {/* Thoughts */}
              <p className="font-sans text-base italic text-charcoal/80 leading-relaxed">
                &ldquo;{run.thoughts}&rdquo;
              </p>

              {/* Links */}
              {run.links && run.links.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/30 mb-2.5">
                    On this run
                  </p>
                  <div className="flex flex-col gap-2">
                    {run.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 group"
                      >
                        <LinkIcon type={link.type || "other"} />
                        <span className="text-sm text-charcoal/60 group-hover:text-charcoal transition-colors truncate">
                          {link.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/40 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
