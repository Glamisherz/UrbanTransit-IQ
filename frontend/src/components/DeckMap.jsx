import React, { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DeckMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    try {
      // Handle MapLibre export resolution across different Vite bundler versions
      const MapClass = maplibregl.Map || maplibregl.default?.Map;

      map.current = new MapClass({
        container: mapContainer.current,
        style:
          "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: [67.0011, 24.8607],
        zoom: 11,
        pitch: 45,
      });

      const NavControl =
        maplibregl.NavigationControl || maplibregl.default?.NavigationControl;
      if (NavControl) {
        map.current.addControl(new NavControl(), "top-right");
      }

      map.current.on("load", () => {
        // 1. Transit Stops Data
        const stopsData = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.0011, 24.8607] },
              properties: {
                title: "Karachi Central (S001)",
                type: "Bottleneck",
              },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.0312, 24.8138] },
              properties: { title: "Clifton (S005)", type: "Bottleneck" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.0971, 24.918] },
              properties: { title: "Gulshan (S012)", type: "Normal" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.0624, 24.856] },
              properties: { title: "Shahrah-e-Faisal (S020)", type: "Normal" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.0125, 24.8569] },
              properties: { title: "Saddar (S002)", type: "Overcrowded" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [66.985, 24.892] },
              properties: { title: "S.I.T.E Area (S045)", type: "Overcrowded" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.2025, 24.8612] },
              properties: { title: "Malir (S080)", type: "Normal" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [66.992, 24.848] },
              properties: { title: "Tower (S003)", type: "Normal" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.033, 24.938] },
              properties: {
                title: "North Nazimabad (S018)",
                type: "Bottleneck",
              },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [67.005, 24.851] },
              properties: {
                title: "I.I. Chundrigar (S004)",
                type: "Bottleneck",
              },
            },
          ],
        };

        map.current.addSource("transit-stops", {
          type: "geojson",
          data: stopsData,
        });

        map.current.addLayer({
          id: "stops-layer",
          type: "circle",
          source: "transit-stops",
          paint: {
            "circle-radius": 8,
            "circle-color": [
              "match",
              ["get", "type"],
              "Bottleneck",
              "#ef4444",
              "Overcrowded",
              "#f59e0b",
              "#10b981",
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // 2. Route Lines Data
        const routesData = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [67.0011, 24.8607],
                  [67.0312, 24.8138],
                ],
              },
              properties: { name: "S001 -> S005", status: "Bottleneck" },
            },
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [67.0971, 24.918],
                  [67.0624, 24.856],
                ],
              },
              properties: { name: "S012 -> S020", status: "Normal" },
            },
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [67.0125, 24.8569],
                  [66.985, 24.892],
                ],
              },
              properties: { name: "S002 -> S045", status: "Overcrowded" },
            },
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [67.2025, 24.8612],
                  [66.992, 24.848],
                ],
              },
              properties: { name: "S080 -> S003", status: "Normal" },
            },
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [67.033, 24.938],
                  [67.005, 24.851],
                ],
              },
              properties: { name: "S018 -> S004", status: "Bottleneck" },
            },
          ],
        };

        map.current.addSource("transit-routes", {
          type: "geojson",
          data: routesData,
        });

        map.current.addLayer({
          id: "routes-layer",
          type: "line",
          source: "transit-routes",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": [
              "match",
              ["get", "status"],
              "Bottleneck",
              "#ef4444",
              "Overcrowded",
              "#f59e0b",
              "#6366f1",
            ],
            "line-width": 4,
            "line-opacity": 0.8,
          },
        });
      });
    } catch (err) {
      console.error("Map rendering error:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[380px] relative rounded-xl overflow-hidden bg-slate-950">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default DeckMap;
