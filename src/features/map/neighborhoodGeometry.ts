import type { FeatureCollection, MultiPolygon, Polygon, Position } from "geojson";
import type { PublicNeighborhood } from "@/types/neighborhood";

function isPosition(value: unknown): value is Position {
  return Array.isArray(value) && value.length >= 2 &&
    typeof value[0] === "number" && Number.isFinite(value[0]) && Math.abs(value[0]) <= 180 &&
    typeof value[1] === "number" && Number.isFinite(value[1]) && Math.abs(value[1]) <= 90;
}
function isRing(value: unknown): value is Position[] {
  if (!Array.isArray(value) || value.length < 4 || !value.every(isPosition)) return false;
  const first = value[0], last = value[value.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}
function isPolygon(value: unknown): value is Position[][] {
  return Array.isArray(value) && value.length > 0 && value.every(isRing);
}
export function neighborhoodGeometry(item: PublicNeighborhood): Polygon | MultiPolygon | null {
  const geometry = item.geometry;
  if (geometry?.type === "Polygon" && isPolygon(geometry.coordinates)) {
    return { type: "Polygon", coordinates: geometry.coordinates };
  }
  if (geometry?.type === "MultiPolygon" && geometry.coordinates.length > 0 && geometry.coordinates.every(isPolygon)) {
    return { type: "MultiPolygon", coordinates: geometry.coordinates };
  }
  return null;
}
export function neighborhoodFeatures(items: PublicNeighborhood[]): FeatureCollection<Polygon | MultiPolygon> {
  return {
    type: "FeatureCollection",
    features: items.flatMap(item => {
      const geometry = neighborhoodGeometry(item);
      return geometry ? [{ type: "Feature" as const, geometry, properties: { id: item._id, name: item.name } }] : [];
    }),
  };
}
export function geometryBounds(geometry: Polygon | MultiPolygon): [number, number, number, number] {
  const positions = geometry.type === "Polygon" ? geometry.coordinates.flat() : geometry.coordinates.flat(2);
  return positions.reduce<[number, number, number, number]>((bounds, point) => [
    Math.min(bounds[0], point[0]), Math.min(bounds[1], point[1]),
    Math.max(bounds[2], point[0]), Math.max(bounds[3], point[1]),
  ], [Infinity, Infinity, -Infinity, -Infinity]);
}
