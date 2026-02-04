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

      // Warm vintage-toned map tiles (CartoDB Voyager)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Zoom control bottom-right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      runs.forEach((run) => {
        // Dashed route polyline
        const polyline = L.polyline(run.coordinates, {
          color: run.color,
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1,
          dashArray: "8 6",
        }).addTo(map);

        // Photo thumbnail marker at route start
        const startPoint = run.coordinates[0];
        const photoIcon = L.divIcon({
          className: "photo-marker-wrap",
          html: `
            <div class="photo-marker">
              <img src="${run.photoUrl}" alt="${run.location}" />
            </div>
            <div class="photo-marker-label">${run.location.split(",")[0]}</div>
          `,
          iconSize: [72, 80],
          iconAnchor: [36, 36],
        });

        const marker = L.marker(startPoint, { icon: photoIcon }).addTo(map);
        marker.on("click", () => onSelectRun(run));

        polyline.on("click", () => onSelectRun(run));
        polyline.on("mouseover", () => {
          polyline.setStyle({ opacity: 0.9, weight: 4, dashArray: "" });
        });
        polyline.on("mouseout", () => {
          polyline.setStyle({ opacity: 0.5, weight: 3, dashArray: "8 6" });
        });
      });

      // Fit map to all routes
      const allCoords = runs.flatMap((r) => r.coordinates);
      if (allCoords.length) {
        map.fitBounds(L.latLngBounds(allCoords), { padding: [50, 50] });
      }

      setMapReady(true);
    };

    initMap();
  }, [runs, onSelectRun]);

  return (
    <div className="relative">
      <div
        id="run-map"
        className="w-full rounded-lg"
        style={{ height: "72vh", minHeight: 500, background: "#e8e4dc" }}
      />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream/80 rounded-lg">
          <p className="text-sm text-warm-gray animate-pulse">
            Loading map...
          </p>
        </div>
      )}
    </div>
  );
}
