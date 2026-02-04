"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Run } from "@/types";

interface RunsEditorProps {
  runs: Run[];
  onSave: (runs: Run[]) => void;
}

export default function RunsEditor({ runs, onSave }: RunsEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedRuns, setEditedRuns] = useState<Run[]>(runs);
  const [jsonText, setJsonText] = useState(JSON.stringify(runs, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setEditedRuns(parsed);
      setError(null);
      onSave(parsed);
      setIsOpen(false);
    } catch (e) {
      setError("Invalid JSON. Please check your syntax.");
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(runs, null, 2));
    setError(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    // Show a brief success message
    const btn = document.getElementById("copy-btn");
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        if (btn) btn.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating edit button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-tan text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg
          className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </motion.button>

      {/* Editor modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl md:h-[85vh] z-50 bg-cream rounded-lg shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-charcoal/10">
                <h2 className="font-serif text-2xl text-charcoal mb-2">
                  Edit Runs
                </h2>
                <p className="text-sm text-warm-gray mb-2">
                  Edit the JSON below to update your runs. Changes apply immediately in the browser.
                </p>
                <p className="text-xs text-warm-gray/80 italic">
                  💡 Tip: Copy the JSON and paste it into <code className="bg-white/60 px-1 rounded">src/data/runs.ts</code> to make changes permanent.
                </p>
              </div>

              {/* Editor */}
              <div className="flex-1 overflow-hidden flex flex-col p-6">
                <div className="flex-1 relative">
                  <textarea
                    value={jsonText}
                    onChange={(e) => {
                      setJsonText(e.target.value);
                      setError(null);
                    }}
                    className="w-full h-full p-4 font-mono text-sm bg-white rounded border border-charcoal/20 focus:border-tan focus:ring-2 focus:ring-tan/20 outline-none resize-none"
                    spellCheck={false}
                  />
                  {error && (
                    <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-2 rounded text-sm">
                      {error}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm text-charcoal bg-white border border-charcoal/20 rounded hover:bg-charcoal/5 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    id="copy-btn"
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm text-charcoal bg-white border border-charcoal/20 rounded hover:bg-charcoal/5 transition-colors"
                  >
                    Copy JSON
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm text-charcoal bg-white border border-charcoal/20 rounded hover:bg-charcoal/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm text-white bg-tan rounded hover:bg-tan/90 transition-colors ml-auto"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

