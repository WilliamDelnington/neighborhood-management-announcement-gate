export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTimeOfDay(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

// Khoi ngay tren the lich hop: { day: "12", month: "Th10" }.
export function formatDayMonth(value: string | Date): { day: string; month: string } {
  const date = typeof value === "string" ? new Date(value) : value;
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: `Th${date.getMonth() + 1}`,
  };
}

export function formatDateRange(start: string, end?: string | null): string {
  const from = formatDate(start);
  if (!end) return from;
  const to = formatDate(end);
  return to === from ? from : `${from} – ${to}`;
}
