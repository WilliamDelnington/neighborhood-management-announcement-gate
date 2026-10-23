type PoiAppearance = { label: string; color: string; paths: string[] };

const APPEARANCES: Record<string, PoiAppearance> = {
  restaurant: { label: "Nhà hàng / Quán ăn", color: "#c2410c", paths: ["M4 3v6a2 2 0 0 0 4 0V3M6 3v18M15 3v8h5V3c-3 0-5 3-5 8M20 11v10"] },
  cafe: { label: "Cà phê", color: "#854d0e", paths: ["M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM17 9h2a3 3 0 0 1 0 6h-2M2 22h18M6 2v3M10 2v3M14 2v3"] },
  gas: { label: "Cây xăng", color: "#b91c1c", paths: ["M4 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M3 21h12M7 6h4v5H7ZM14 13h2a2 2 0 0 1 2 2v3a2 2 0 0 0 4 0V9l-4-4M19 6v4h3"] },
  school: { label: "Trường học", color: "#6d28d9", paths: ["M2 8l10-5 10 5-10 5L2 8ZM6 10v7c4 3 8 3 12 0v-7M22 8v9"] },
  market: { label: "Chợ / Siêu thị", color: "#047857", paths: ["M3 3h2l3 13h11l3-9H6M9 21h.01M18 21h.01M9 7v5M14 7v5M19 7v5"] },
  clinic: { label: "Y tế", color: "#0369a1", paths: ["M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"] },
  pharmacy: { label: "Nhà thuốc", color: "#0f766e", paths: ["M9 4a6 6 0 0 1 9 9l-5 5a6 6 0 0 1-9-9l5-5ZM8 5l11 11"] },
  bus: { label: "Điểm xe buýt", color: "#1d4ed8", paths: ["M5 18V5c0-4 14-4 14 0v13H5ZM5 11h14M5 5h14M8 15h.01M16 15h.01M7 18v3M17 18v3"] },
  atm: { label: "Ngân hàng / ATM", color: "#a16207", paths: ["M2 9l10-6 10 6H2ZM4 21h16M6 12v6M12 12v6M18 12v6"] },
  hair_salon: { label: "Cắt tóc", color: "#be185d", paths: ["M9 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM9 18a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM8 10l13 11M8 16L21 3"] },
  park: { label: "Công viên", color: "#3f6212", paths: ["M12 2l6 7h-3l5 7H4l5-7H6l6-7ZM12 16v6M8 22h8"] },
};
const DEFAULT: PoiAppearance = { label: "Địa điểm", color: "#475569", paths: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"] };

export function getPoiAppearance(category: string): PoiAppearance {
  return APPEARANCES[category] ?? DEFAULT;
}

export function createPoiIcon(category: string): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (const [key, value] of Object.entries({ viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", focusable: "false" })) svg.setAttribute(key, value);
  for (const d of getPoiAppearance(category).paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.append(path);
  }
  return svg;
}
