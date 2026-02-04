"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import RunCard from "@/components/runs/RunCard";
import PostcardModal from "@/components/runs/PostcardModal";
import { runs } from "@/data/runs";
import { Run } from "@/types";

const RunMap = dynamic(() => import("@/components/runs/RunMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-cream postcard-shadow flex items-center justify-center">
      <p className="text-sm text-warm-gray animate-pulse">Loading map...</p>
    </div>
  ),
});

export default function RunsPage() {
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);

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
            Runs
          </h1>
          <p className="mt-3 text-warm-gray text-sm leading-relaxed max-w-lg">
            Routes and reflections from runs around the world. Click a route on
            the map or a card below to open the postcard.
          </p>
          <div className="mt-4 w-12 h-[1px] bg-tan" />
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <RunMap runs={runs} onSelectRun={setSelectedRun} />
        </motion.div>

        {/* Run cards grid */}
        <div className="mt-12">
          <h2 className="font-serif text-2xl text-charcoal mb-6">
            All Routes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {runs.map((run, i) => (
              <RunCard
                key={run.id}
                run={run}
                index={i}
                onClick={() => setSelectedRun(run)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Postcard Modal */}
      <PostcardModal run={selectedRun} onClose={() => setSelectedRun(null)} />
    </PageTransition>
  );
}
