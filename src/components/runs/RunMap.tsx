"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Run } from "@/types";

interface RunMapProps {
  runs: Run[];
  onSelectRun: (run: Run) => void;
}

export default function RunMap({ runs, onSelectRun }: RunMapProps) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      const container = document.getElementById("run-map");
      if (!container || (container as any)._leaflet_id) return;

      const map = L.map("run-map", {
        scrollWheelZoom: false,
        zoomControl: false,
      });

      // Warm vintage map tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Deterministic tilt per run
      const tilts = [-4, 3, -2, 5, -6, 2, -3, 4, -5, 1];

      runs.forEach((run, i) => {
        // Route polyline
        L.polyline(run.coordinates, {
          color: run.color,
          weight: 3,
          opacity: 0.45,
          smoothFactor: 1,
        }).addTo(map);

        // Photo marker at start of route
        const start = run.coordinates[0];
        const tilt = tilts[i % tilts.length];

        const icon = L.divIcon({
          className: "run-photo-pin",
          html: `
            <div class="run-photo-frame" style="transform:rotate(${tilt}deg)">
              <img src="${run.photoUrl}" alt="${run.location}" />
              <span class="run-photo-city">${run.location.split(",")[0]}</span>
            </div>
          `,
          iconSize: [110, 130],
          iconAnchor: [55, 65],
        });

        L.marker(start, { icon }).addTo(map).on("click", () => onSelectRun(run));
      });

      // Fit to routes
      const pts = runs.flatMap((r) => r.coordinates);
      if (pts.length) {
        map.fitBounds(L.latLngBounds(pts), {
          padding: [60, 60],
          maxZoom: 6,
        });
      }

      setMapReady(true);
    };

    initMap();
  }, [runs, onSelectRun]);

  return (
    <div className="relative run-map-container">
      <div
        id="run-map"
        className="w-full rounded-lg"
        style={{ height: "70vh", minHeight: 480, background: "#ece6db" }}
      />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream/80 rounded-lg">
          <p className="text-sm text-warm-gray animate-pulse">Loading map...</p>
        </div>
      )}
    </div>
  );
}
