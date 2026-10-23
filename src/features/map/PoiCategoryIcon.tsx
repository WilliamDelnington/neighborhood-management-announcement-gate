import { getPoiAppearance } from "./poiAppearance";

export function PoiCategoryIcon({ category }: { category: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {getPoiAppearance(category).paths.map((d, index) => <path key={index} d={d} />)}
  </svg>;
}
