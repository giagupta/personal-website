"use client";

import { useMemo, useState, useRef, useCallback } from "react";
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

interface Edge {
  from: number;
  to: number;
}

/* ── Layout: spread nodes organically across the canvas ── */
function layoutNodes(runs: Run[], w: number, h: number): Node[] {
  const pad = 60;
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
    const angleStep = Math.PI * (3 - Math.sqrt(5));
    nodes = runs.map((r, i) => {
      const radius = Math.sqrt(i / runs.length) * Math.min(uw, uh) * 0.45;
      const angle = i * angleStep;
      return {
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        run: r,
      };
    });
  }

  // Push apart overlapping nodes
  for (let iter = 0; iter < 20; iter++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const minD = 90;
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

  nodes.forEach((n) => {
    n.x = Math.max(pad, Math.min(w - pad, n.x));
    n.y = Math.max(pad, Math.min(h - pad, n.y));
  });

  return nodes;
}

/* ── Build edges: sequential + proximity-based cross-links ── */
function buildEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  const edgeSet = new Set<string>();

  const addEdge = (from: number, to: number) => {
    const key = `${Math.min(from, to)}-${Math.max(from, to)}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push({ from, to });
    }
  };

  for (let i = 1; i < nodes.length; i++) {
    addEdge(i - 1, i);
  }

  for (let i = 0; i < nodes.length; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      dists.push({ j, d: Math.sqrt(dx * dx + dy * dy) });
    }
    dists.sort((a, b) => a.d - b.d);
    const limit = Math.min(2, dists.length);
    for (let k = 0; k < limit; k++) {
      addEdge(i, dists[k].j);
    }
  }

  return edges;
}

const W = 900;
const H = 600;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 3;

export default function RunGraph({ runs, onSelectRun }: Props) {
  const nodes = useMemo(() => layoutNodes(runs, W, H), [runs]);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Zoom & pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z * delta)));
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only pan with middle-click or if not clicking a node
      if (e.button === 1 || (e.button === 0 && !(e.target as HTMLElement).closest("[data-node]"))) {
        setIsPanning(true);
        panStart.current = { x: e.clientX, y: e.clientY };
        panOrigin.current = { ...pan };
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }
    },
    [pan]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setPan({ x: panOrigin.current.x + dx / zoom, y: panOrigin.current.y + dy / zoom });
    },
    [isPanning, zoom]
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Compute viewBox based on zoom & pan
  const vbW = W / zoom;
  const vbH = H / zoom;
  const vbX = (W - vbW) / 2 - pan.x;
  const vbY = (H - vbH) / 2 - pan.y;

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="w-full overflow-hidden rounded-2xl"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
      >
        <svg
          viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
          className="w-full min-w-[500px]"
          style={{ maxHeight: "75vh" }}
        >
          {/* Connecting lines */}
          {edges.map((edge, i) => {
            const a = nodes[edge.from];
            const b = nodes[edge.to];
            const isHovered =
              hoveredId === a.run.id || hoveredId === b.run.id;
            return (
              <motion.line
                key={`edge-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={isHovered ? "#2C2C2C" : "#9CA3AF"}
                strokeWidth={isHovered ? 1.2 : 0.7}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.7 : 0.4 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.5 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isHovered = hoveredId === node.run.id;
            const r = 22;
            return (
              <motion.g
                key={node.run.id}
                data-node
                style={{ cursor: "pointer" }}
                onClick={() => onSelectRun(node.run)}
                onMouseEnter={() => setHoveredId(node.run.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <defs>
                  <clipPath id={`clip-${i}`}>
                    <circle cx={node.x} cy={node.y} r={r} />
                  </clipPath>
                </defs>

                {/* Subtle shadow */}
                <circle
                  cx={node.x + 1}
                  cy={node.y + 2}
                  r={r + 1}
                  fill="rgba(0,0,0,0.06)"
                />

                {/* Border */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 1}
                  fill="#F5F0E8"
                  stroke={isHovered ? "#2C2C2C" : "#D1D5DB"}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                />

                {/* Photo */}
                <image
                  href={node.run.photoUrl}
                  x={node.x - r}
                  y={node.y - r}
                  width={r * 2}
                  height={r * 2}
                  clipPath={`url(#clip-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* City label — only on hover */}
                {isHovered && (
                  <motion.text
                    x={node.x}
                    y={node.y + r + 16}
                    textAnchor="middle"
                    fontSize={11}
                    fontFamily="Karla, sans-serif"
                    fontWeight={500}
                    fill="#2C2C2C"
                    initial={{ opacity: 0, y: node.y + r + 10 }}
                    animate={{ opacity: 1, y: node.y + r + 16 }}
                    transition={{ duration: 0.15 }}
                  >
                    {node.run.location.split(",")[0]}
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Zoom controls */}
      {zoom !== 1 && (
        <button
          onClick={resetView}
          className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal bg-cream/80 backdrop-blur-sm px-2.5 py-1 rounded-full transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
