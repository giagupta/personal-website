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
          className="mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-sans text-3xl md:text-4xl font-light text-charcoal">
            Runs
          </h1>
          <p className="mt-1.5 text-xs text-charcoal/30">
            {runs.length} runs &middot; click a node to read
          </p>
        </motion.div>

        {/* Network graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className=""
        >
          <RunGraph runs={runs} onSelectRun={setSelectedRun} />
        </motion.div>

        {/* Minimal list below */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {runs.map((run, i) => (
            <motion.button
              key={run.id}
              onClick={() => setSelectedRun(run)}
              className="text-xs text-charcoal/40 hover:text-charcoal transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
            >
              {run.location.split(",")[0]}
            </motion.button>
          ))}
        </div>
      </div>

      <PostcardModal run={selectedRun} onClose={() => setSelectedRun(null)} />
    </PageTransition>
  );
}
