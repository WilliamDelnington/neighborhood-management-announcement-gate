import { useEffect, useRef, useState, type ReactNode } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MapInstance, GeoJSONSource, StyleSpecification } from "maplibre-gl";
import mapWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import type { PublicNeighborhood } from "@/types/neighborhood";
import { googleMapsDirectionsUrl } from "@/utils/googleMaps";
import type { PublicPoi } from "./usePublicPois";
import { geometryBounds, neighborhoodFeatures, neighborhoodGeometry } from "./neighborhoodGeometry";
import styles from "./WardMapSection.module.css";

// Vite must bundle this worker; otherwise a VPS build shows tiles without data.
maplibregl.setWorkerUrl(mapWorkerUrl);

const rasterFallback: StyleSpecification = {
  version: 8,
  sources: { basemap: {
    type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    tileSize: 256, maxzoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
  } },
  layers: [{ id: "basemap", type: "raster", source: "basemap" }],
};

type Props = {
  neighborhoods: PublicNeighborhood[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  pois: PublicPoi[];
  selectedPoiId: string | null;
  onSelectPoi: (id: string) => void;
  fallback: ReactNode;
};

export default function NeighborhoodBoundaryMap({ neighborhoods, selectedId, onSelect, pois, selectedPoiId, onSelectPoi, fallback }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const data = neighborhoodFeatures(neighborhoods);
    let map: MapInstance | undefined;
    let observer: ResizeObserver | undefined;
    let timeout: ReturnType<typeof setTimeout>;
    setReady(false);
    setFailed(false);
    setTileError(false);
    try {
      map = new maplibregl.Map({
        container: container.current,
        center: [105.745, 20.98], zoom: 13,
        style: import.meta.env.VITE_MAP_STYLE_URL?.trim() || "https://tiles.openfreemap.org/styles/liberty",
        cooperativeGestures: true,
      });
      const current = map;
      mapRef.current = current;
      let usingFallback = false;
      const switchBasemap = () => {
        if (usingFallback) { setTileError(true); return; }
        usingFallback = true;
        setReady(false);
        setTileError(false);
        clearTimeout(timeout);
        timeout = setTimeout(() => setFailed(true), 15_000);
        current.setStyle(rasterFallback);
      };
      timeout = setTimeout(switchBasemap, 12_000);
      current.addControl(new maplibregl.NavigationControl(), "top-right");
      current.addControl(new maplibregl.FullscreenControl(), "top-right");
      current.on("error", event => {
        if ("sourceId" in event && ["neighborhoods", "public-pois"].includes(String(event.sourceId))) setFailed(true);
        else switchBasemap();
      });
      // Initialize overlays as soon as the style is ready; slow tiles must not block data.
      current.on("style.load", () => {
        try {
          // Category choices control our public POIs; hide the provider's generic POI labels.
          for (const layer of current.getStyle().layers) {
            if (layer.type === "symbol" && /poi|housenumber/i.test(layer.id)) current.removeLayer(layer.id);
          }
          current.addSource("neighborhoods", { type: "geojson", data });
          current.addLayer({ id: "areas", type: "fill", source: "neighborhoods", paint: { "fill-color": "#0d4b91", "fill-opacity": 0.15 } });
          current.addLayer({ id: "outlines", type: "line", source: "neighborhoods", paint: { "line-color": "#0d4b91", "line-width": 2 } });
          current.addSource("public-pois", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
          current.addLayer({ id: "poi-points", type: "circle", source: "public-pois", paint: {
            "circle-radius": 7, "circle-color": "#b45309", "circle-stroke-color": "#ffffff", "circle-stroke-width": 2,
          } });
          if (data.features.length) {
            const bounds = new maplibregl.LngLatBounds();
            data.features.forEach(feature => {
              const box = geometryBounds(feature.geometry);
              bounds.extend([box[0], box[1]]).extend([box[2], box[3]]);
            });
            current.fitBounds(bounds, { padding: 45, maxZoom: 16, duration: 0 });
          }
          clearTimeout(timeout);
          setReady(true);
        } catch { clearTimeout(timeout); setFailed(true); }
      });
      current.on("click", event => {
        if (!current.getLayer("poi-points")) return;
        const features = current.queryRenderedFeatures(event.point, { layers: ["poi-points", "areas"] });
        const poi = features.find(feature => feature.layer.id === "poi-points");
        if (poi?.properties?.id) onSelectPoi(String(poi.properties.id));
        else if (features[0]?.properties?.id) onSelect(String(features[0].properties.id));
      });
      for (const layer of ["areas", "poi-points"]) {
        current.on("mouseenter", layer, () => { current.getCanvas().style.cursor = "pointer"; });
        current.on("mouseleave", layer, () => { current.getCanvas().style.cursor = ""; });
      }
      observer = new ResizeObserver(() => current.resize());
      observer.observe(container.current);
    } catch { setFailed(true); }
    return () => {
      clearTimeout(timeout);
      observer?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [neighborhoods, onSelect, onSelectPoi]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map?.getLayer("areas")) return;
    map.setPaintProperty("areas", "fill-opacity", ["case", ["==", ["get", "id"], selectedId ?? ""], 0.4, 0.15]);
    map.setPaintProperty("outlines", "line-width", ["case", ["==", ["get", "id"], selectedId ?? ""], 4, 2]);
    const item = neighborhoods.find(item => item._id === selectedId);
    const geometry = item && neighborhoodGeometry(item);
    if (geometry) {
      const box = geometryBounds(geometry);
      map.fitBounds([[box[0], box[1]], [box[2], box[3]]], { padding: 50, maxZoom: 16, duration: 0 });
    }
  }, [selectedId, neighborhoods, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map?.getSource("public-pois")) return;
    (map.getSource("public-pois") as GeoJSONSource).setData({ type: "FeatureCollection", features: pois.map(poi => ({
      type: "Feature", properties: { id: poi.id, name: poi.name }, geometry: { type: "Point", coordinates: [poi.lng, poi.lat] },
    })) });
    map.setPaintProperty("poi-points", "circle-radius", ["case", ["==", ["get", "id"], selectedPoiId ?? ""], 10, 7]);
    const poi = pois.find(point => point.id === selectedPoiId);
    if (!poi) return;
    map.jumpTo({ center: [poi.lng, poi.lat], zoom: 16 });
    const content = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = poi.name;
    const address = document.createElement("p");
    address.textContent = poi.address;
    const directions = document.createElement("a");
    directions.href = googleMapsDirectionsUrl(poi.lat, poi.lng);
    directions.target = "_blank";
    directions.rel = "noopener noreferrer";
    directions.textContent = "Chỉ đường trên Google Maps →";
    directions.setAttribute("aria-label", `Chỉ đường đến ${poi.name} trên Google Maps`);
    directions.className = styles.poiDirections;
    content.append(title, address, directions);
    const popup = new maplibregl.Popup({ closeButton: false }).setLngLat([poi.lng, poi.lat]).setDOMContent(content).addTo(map);
    return () => { popup.remove(); };
  }, [pois, selectedPoiId, ready]);

  if (failed) return <>{fallback}</>;
  return <div className={styles.mapSurface} aria-busy={!ready}>
    <div ref={container} className={styles.map} role="region" aria-label="Bản đồ Tổ dân phố và địa điểm tiện ích" />
    {!ready && <p className={styles.mapWarning} role="status">Đang tải bản đồ…</p>}
    {tileError && <div className={styles.mapWarning} role="status">Nền bản đồ đang tải chậm. Danh sách địa điểm và thông tin Tổ dân phố vẫn có thể sử dụng.<button type="button" className={styles.reloadMap} onClick={() => setFailed(true)}>Mở bản đồ dự phòng</button></div>}
  </div>;
}
