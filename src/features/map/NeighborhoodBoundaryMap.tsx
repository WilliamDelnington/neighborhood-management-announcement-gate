import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapInstance } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { PublicNeighborhood } from "@/types/neighborhood";
import { geometryBounds, neighborhoodFeatures, neighborhoodGeometry } from "./neighborhoodGeometry";
import styles from "./WardMapSection.module.css";

type Props = {
  neighborhoods: PublicNeighborhood[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function NeighborhoodBoundaryMap({ neighborhoods, selectedId, onSelect }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const data = neighborhoodFeatures(neighborhoods);
    if (!data.features.length) return;
    let map: MapInstance;
    setFailed(false);
    setReady(false);
    try {
      map = new maplibregl.Map({
        container: container.current,
        style: {
          version: 8,
          sources: { basemap: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            maxzoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
          } },
          layers: [{ id: "basemap", type: "raster", source: "basemap" }],
        },
        cooperativeGestures: true,
      });
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      map.addControl(new maplibregl.FullscreenControl(), "top-right");
      map.on("error", () => setFailed(true));
      map.on("load", () => {
        map.addSource("neighborhoods", { type: "geojson", data });
        map.addLayer({ id: "areas", type: "fill", source: "neighborhoods", paint: { "fill-color": "#0d4b91", "fill-opacity": 0.15 } });
        map.addLayer({ id: "outlines", type: "line", source: "neighborhoods", paint: { "line-color": "#0d4b91", "line-width": 2 } });
        const bounds = new maplibregl.LngLatBounds();
        data.features.forEach(feature => {
          const box = geometryBounds(feature.geometry);
          bounds.extend([box[0], box[1]]).extend([box[2], box[3]]);
        });
        map.fitBounds(bounds, { padding: 45, maxZoom: 16, duration: 0 });
        setReady(true);
      });
      map.on("click", "areas", event => {
        const id = event.features?.[0]?.properties?.id;
        if (typeof id === "string") onSelect(id);
      });
      map.on("mouseenter", "areas", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "areas", () => { map.getCanvas().style.cursor = ""; });
    } catch {
      setFailed(true);
      return;
    }
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [neighborhoods, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || !map.getLayer("areas")) return;
    map.setPaintProperty("areas", "fill-opacity", ["case", ["==", ["get", "id"], selectedId ?? ""], 0.4, 0.15]);
    map.setPaintProperty("outlines", "line-width", ["case", ["==", ["get", "id"], selectedId ?? ""], 4, 2]);
    const item = neighborhoods.find(item => item._id === selectedId);
    const geometry = item && neighborhoodGeometry(item);
    if (geometry) {
      const box = geometryBounds(geometry);
      map.fitBounds([[box[0], box[1]], [box[2], box[3]]], { padding: 50, maxZoom: 16, duration: 0 });
    }
  }, [selectedId, neighborhoods, ready]);

  return <div className={styles.mapSurface}>
    <div ref={container} className={styles.map} role="region" aria-label="Bản đồ ranh giới Tổ dân phố; chọn tổ trong danh sách để xem chi tiết" />
    {failed && <p className={styles.mapWarning} role="status">Không thể tải đầy đủ bản đồ. Bạn vẫn có thể tra cứu thông tin Tổ dân phố trong danh sách.</p>}
  </div>;
}
