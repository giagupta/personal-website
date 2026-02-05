"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RunGraph from "@/components/runs/RunGraph";
import PostcardModal from "@/components/runs/PostcardModal";
import { Run } from "@/types";

export default function RunsClient({ runs }: { runs: Run[] }) {
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">
            Runs
          </h1>
          <p className="mt-2 text-sm text-charcoal/40 max-w-sm">
            Each node is a run. Connected in the order I did them.
            Click any photo to read the postcard.
          </p>
        </motion.div>

        {/* Connected nodes graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <RunGraph runs={runs} onSelectRun={setSelectedRun} />
        </motion.div>

        {/* Compact strip below */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {runs.map((run, i) => (
            <motion.button
              key={run.id}
              onClick={() => setSelectedRun(run)}
              className="group text-left"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -3 }}
            >
              <div className="relative aspect-square rounded-md overflow-hidden">
                <img
                  src={run.photoUrl}
                  alt={run.location}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] text-white/90 font-medium bg-charcoal/30 backdrop-blur-sm px-1 py-0.5 rounded-sm">
                  {run.distance}
                </span>
              </div>
              <p className="mt-1.5 font-serif text-xs font-medium text-charcoal truncate">
                {run.location}
              </p>
              <p className="text-[10px] text-warm-gray">{run.date}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <PostcardModal run={selectedRun} onClose={() => setSelectedRun(null)} />
    </PageTransition>
  );
}
