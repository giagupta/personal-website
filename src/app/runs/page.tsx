"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import PostcardModal from "@/components/runs/PostcardModal";
import { runs } from "@/data/runs";
import { Run } from "@/types";

const RunMap = dynamic(() => import("@/components/runs/RunMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-lg bg-cream flex items-center justify-center"
      style={{ height: "72vh", minHeight: 500 }}
    >
      <p className="text-sm text-warm-gray animate-pulse">Loading map...</p>
    </div>
  ),
});

export default function RunsPage() {
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">
            Runs
          </h1>
          <p className="mt-2 text-sm text-charcoal/40 max-w-md">
            Routes and reflections from runs around the world. Click a photo on
            the map to open the postcard.
          </p>
        </motion.div>

        {/* Map — hero element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <RunMap runs={runs} onSelectRun={setSelectedRun} />
        </motion.div>

        {/* Compact run strip below map */}
        <div className="mt-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 md:gap-5 min-w-max md:min-w-0 md:grid md:grid-cols-3 lg:grid-cols-6">
            {runs.map((run, i) => (
              <motion.button
                key={run.id}
                onClick={() => setSelectedRun(run)}
                className="group flex-shrink-0 w-40 md:w-auto text-left"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <div className="relative h-24 md:h-28 rounded-md overflow-hidden">
                  <img
                    src={run.photoUrl}
                    alt={run.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] text-white/90 font-medium tracking-wide bg-charcoal/30 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                    {run.distance}
                  </span>
                </div>
                <p className="mt-2 font-serif text-sm font-medium text-charcoal truncate">
                  {run.location}
                </p>
                <p className="text-[10px] text-warm-gray tracking-wide">
                  {run.date}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Postcard Modal */}
      <PostcardModal run={selectedRun} onClose={() => setSelectedRun(null)} />
    </PageTransition>
  );
}
