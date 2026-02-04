"use client";

import { motion } from "framer-motion";
import { Run } from "@/types";

interface RunsMasonryProps {
  runs: Run[];
  onSelectRun: (run: Run) => void;
}

// Group runs by location (city/country) to handle clustering
function groupRunsByLocation(runs: Run[]): Map<string, Run[]> {
  const grouped = new Map<string, Run[]>();
  
  runs.forEach((run) => {
    // Extract city name (before first comma)
    const city = run.location.split(",")[0].trim();
    const key = city;
    
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(run);
  });
  
  return grouped;
}

// Deterministic tilt angles for visual variety
const tilts = [-4, 3, -2, 5, -6, 2, -3, 4, -5, 1, -3.5, 4.5, -2.5, 3.5];

export default function RunsMasonry({ runs, onSelectRun }: RunsMasonryProps) {
  const groupedRuns = groupRunsByLocation(runs);
  
  // Flatten grouped runs but keep track of grouping for visual spacing
  const allRuns = runs.map((run, index) => ({
    ...run,
    tilt: tilts[index % tilts.length],
    groupCity: run.location.split(",")[0].trim(),
  }));

  return (
    <div className="w-full">
      {/* Render grouped sections */}
      {Array.from(groupedRuns.entries()).map(([city, cityRuns], groupIndex) => (
        <div key={city} className="mb-12 first:mt-0">
          {/* Location header for grouped runs */}
          {cityRuns.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-6"
            >
              <h2 className="font-serif text-2xl font-light text-charcoal/70">
                {city}
              </h2>
              <div className="mt-1 h-px w-16 bg-tan/40" />
            </motion.div>
          )}
          
          {/* Masonry grid for this location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
            {cityRuns.map((run, index) => {
              const globalIndex = runs.findIndex((r) => r.id === run.id);
              const tilt = tilts[globalIndex % tilts.length];
              
              return (
                <motion.button
                  key={run.id}
                  onClick={() => onSelectRun(run)}
                  className="group text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: groupIndex * 0.1 + index * 0.05,
                    duration: 0.4 
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="relative bg-white rounded-lg overflow-hidden postcard-shadow hover:postcard-shadow-lg transition-all duration-300 group-hover:rotate-0"
                    style={{ transform: `rotate(${tilt}deg)` }}
                  >
                    {/* Photo */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={run.photoUrl}
                        alt={run.location}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                      
                      {/* Distance badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] text-white/95 font-medium tracking-wide bg-charcoal/60 backdrop-blur-sm px-2 py-1 rounded-sm">
                          {run.distance}
                        </span>
                      </div>
                      
                      {/* Star icon (Pinterest-style) */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                          <svg
                            className="w-4 h-4 text-charcoal"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card content */}
                    <div className="p-4 bg-white">
                      <p className="text-[10px] text-warm-gray tracking-widest uppercase mb-1">
                        {run.date}
                      </p>
                      <h3 className="font-serif text-base font-medium text-charcoal mb-2 line-clamp-1">
                        {run.location}
                      </h3>
                      <p className="text-xs text-charcoal/60 line-clamp-2 italic leading-relaxed">
                        &ldquo;{run.thoughts}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

