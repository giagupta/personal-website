"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Run } from "@/types";

interface Props {
  runs: Run[];
  onSelectRun: (run: Run) => void;
}

interface Node {
  x: number;
  y: number;
  run: Run;
}

/* ── Layout: position nodes geographically or on a gentle arc ── */
function layoutNodes(runs: Run[], w: number, h: number): Node[] {
  const pad = 80;
  const uw = w - pad * 2;
  const uh = h - pad * 2;

  const hasCoords = runs.some((r) => r.coordinates?.length);

  let nodes: Node[];

  if (hasCoords) {
    const lats = runs.map((r) => r.coordinates?.[0]?.[0] ?? 0);
    const lngs = runs.map((r) => r.coordinates?.[0]?.[1] ?? 0);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const lr = maxLat - minLat || 1;
    const lgr = maxLng - minLng || 1;

    nodes = runs.map((r, i) => ({
      x: pad + ((lngs[i] - minLng) / lgr) * uw,
      y: pad + ((maxLat - lats[i]) / lr) * uh,
      run: r,
    }));
  } else {
    // No coordinates — gentle wave layout
    nodes = runs.map((r, i) => {
      const t = runs.length > 1 ? i / (runs.length - 1) : 0.5;
      return {
        x: pad + t * uw,
        y: pad + uh * 0.5 + Math.sin(t * Math.PI * 1.5) * uh * 0.3,
        run: r,
      };
    });
  }

  // Push apart overlapping nodes
  for (let iter = 0; iter < 15; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const minD = 100;
        if (d < minD && d > 0) {
          const angle = Math.atan2(dy, dx);
          const push = (minD - d) / 2;
          nodes[j].x += Math.cos(angle) * push;
          nodes[j].y += Math.sin(angle) * push;
          nodes[i].x -= Math.cos(angle) * push;
          nodes[i].y -= Math.sin(angle) * push;
        }
      }
    }
  }

  // Clamp to bounds
  nodes.forEach((n) => {
    n.x = Math.max(pad, Math.min(w - pad, n.x));
    n.y = Math.max(pad, Math.min(h - pad, n.y));
  });

  return nodes;
}

/* ── Slightly wobbly bezier between two points ── */
function curvePath(x1: number, y1: number, x2: number, y2: number, i: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const wobble = ((i % 5) - 2) * 12;
  return `M ${x1} ${y1} Q ${mx + nx * wobble} ${my + ny * wobble} ${x2} ${y2}`;
}

const W = 900;
const H = 520;

export default function RunGraph({ runs, onSelectRun }: Props) {
  const nodes = useMemo(() => layoutNodes(runs, W, H), [runs]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[600px]"
        style={{ maxHeight: "65vh" }}
      >
        {/* Background */}
        <rect width={W} height={H} rx={12} fill="#F5F0E8" />

        {/* Connecting lines (drawn first, behind nodes) */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          return (
            <motion.path
              key={`line-${i}`}
              d={curvePath(prev.x, prev.y, node.x, node.y, i)}
              fill="none"
              stroke="#C4A882"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
            />
          );
        })}

        {/* Small dots along lines */}
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          const mx = (prev.x + node.x) / 2;
          const my = (prev.y + node.y) / 2;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={mx}
              cy={my}
              r={2}
              fill="#C4A882"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 + i * 0.15 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.run.id}
            style={{ cursor: "pointer" }}
            onClick={() => onSelectRun(node.run)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.12,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.15 }}
          >
            {/* Photo circle */}
            <defs>
              <clipPath id={`photo-clip-${i}`}>
                <circle cx={node.x} cy={node.y} r={32} />
              </clipPath>
            </defs>

            {/* Shadow */}
            <circle
              cx={node.x + 2}
              cy={node.y + 3}
              r={34}
              fill="rgba(0,0,0,0.08)"
            />

            {/* White border */}
            <circle cx={node.x} cy={node.y} r={35} fill="white" />

            {/* Photo */}
            <image
              href={node.run.photoUrl}
              x={node.x - 32}
              y={node.y - 32}
              width={64}
              height={64}
              clipPath={`url(#photo-clip-${i})`}
              preserveAspectRatio="xMidYMid slice"
            />

            {/* Number badge */}
            <circle
              cx={node.x + 24}
              cy={node.y - 24}
              r={10}
              fill="white"
              stroke="#C4A882"
              strokeWidth={1}
            />
            <text
              x={node.x + 24}
              y={node.y - 20}
              textAnchor="middle"
              fontSize={10}
              fontFamily="Karla, sans-serif"
              fontWeight={600}
              fill="#2C2C2C"
            >
              {i + 1}
            </text>

            {/* City label */}
            <text
              x={node.x}
              y={node.y + 50}
              textAnchor="middle"
              fontSize={11}
              fontFamily="Crimson Pro, serif"
              fontStyle="italic"
              fill="#2C2C2C"
              opacity={0.7}
            >
              {node.run.location.split(",")[0]}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
