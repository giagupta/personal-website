"use client";

import { motion } from "framer-motion";
import { Run } from "@/types";

interface RunCardProps {
  run: Run;
  index: number;
  onClick: () => void;
}

export default function RunCard({ run, index, onClick }: RunCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group text-left w-full bg-white/50 rounded-lg overflow-hidden postcard-shadow hover:postcard-shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={run.photoUrl}
          alt={run.location}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/90 font-medium tracking-wide bg-charcoal/40 backdrop-blur-sm px-2 py-1 rounded-sm">
            {run.distance}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] text-warm-gray tracking-widest uppercase">
          {run.date}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-charcoal">
          {run.location}
        </h3>
        <p className="mt-2 text-sm text-charcoal/60 line-clamp-2 italic">
          &ldquo;{run.thoughts}&rdquo;
        </p>
        <span className="mt-3 inline-block text-xs text-tan tracking-widest uppercase group-hover:tracking-[0.15em] transition-all">
          View Postcard →
        </span>
      </div>
    </motion.button>
  );
}
