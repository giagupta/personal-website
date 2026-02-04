"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import PostcardModal from "@/components/runs/PostcardModal";
import RunsMasonry from "@/components/runs/RunsMasonry";
import RunsEditor from "@/components/runs/RunsEditor";
import { runs as initialRuns } from "@/data/runs";
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

type ViewMode = "grid" | "map";

export default function RunsPage() {
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [runs, setRuns] = useState<Run[]>(initialRuns);

  const handleSaveRuns = (updatedRuns: Run[]) => {
    setRuns(updatedRuns);
    // In a real app, you'd save this to a file or API
    // For now, it's just in-memory
    console.log("Runs updated:", updatedRuns);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal">
                Runs
              </h1>
              <p className="mt-2 text-sm text-charcoal/40 max-w-md">
                {viewMode === "grid"
                  ? "A collection of routes and reflections. Click any card to open the postcard."
                  : "Routes and reflections from runs around the world. Click a photo on the map to open the postcard."}
              </p>
            </div>

            {/* View toggle */}
            <div className="flex gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-1 border border-charcoal/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-tan text-white shadow-sm"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                  viewMode === "map"
                    ? "bg-tan text-white shadow-sm"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content — Grid or Map */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RunsMasonry runs={runs} onSelectRun={setSelectedRun} />
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RunMap runs={runs} onSelectRun={setSelectedRun} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Postcard Modal */}
      <PostcardModal run={selectedRun} onClose={() => setSelectedRun(null)} />

      {/* Editor (floating button) */}
      <RunsEditor runs={runs} onSave={handleSaveRuns} />
    </PageTransition>
  );
}
