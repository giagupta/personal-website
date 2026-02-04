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
    // Dynamic import to avoid SSR issues with Leaflet
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Check if map is already initialized
      const container = document.getElementById("run-map");
      if (!container || (container as any)._leaflet_id) return;

      const map = L.map("run-map", {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([40, 10], 3);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      runs.forEach((run) => {
        const polyline = L.polyline(run.coordinates, {
          color: run.color,
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1,
        }).addTo(map);

        // Add a circle marker at the start point
        const startPoint = run.coordinates[0];
        L.circleMarker(startPoint, {
          radius: 6,
          fillColor: run.color,
          color: "#fff",
          weight: 2,
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${run.location}</strong><br/>${run.date}<br/><em>${run.distance}</em>`
          );

        polyline.on("click", () => onSelectRun(run));
        polyline.on("mouseover", function () {
          polyline.setStyle({ weight: 6, opacity: 1 });
        });
        polyline.on("mouseout", function () {
          polyline.setStyle({ weight: 4, opacity: 0.8 });
        });
      });

      setMapReady(true);
    };

    initMap();
  }, [runs, onSelectRun]);

  return (
    <div className="relative">
      <div
        id="run-map"
        className="w-full h-[400px] md:h-[500px] rounded-lg postcard-shadow"
        style={{ background: "#e8e4dc" }}
      />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream/80 rounded-lg">
          <p className="text-sm text-warm-gray animate-pulse">Loading map...</p>
        </div>
      )}
    </div>
  );
}
