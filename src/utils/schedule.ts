import type { TimeRange, WeeklyTimeSlot } from "@/types/appointmentService";

// dayOfWeek: 1 = Thu 2 ... 7 = Chu nhat
export const DAY_LABEL: Record<number, string> = {
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
  7: "Chủ nhật",
};

const DAY_SHORT: Record<number, string> = {
  1: "T2",
  2: "T3",
  3: "T4",
  4: "T5",
  5: "T6",
  6: "T7",
  7: "CN",
};

// "08:00" -> "8:00"
export function formatClock(value: string): string {
  return value.replace(/^0(\d):/, "$1:");
}

export function formatRanges(ranges: TimeRange[], separator = " – "): string {
  return [...ranges]
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map(r => `${formatClock(r.startTime)}${separator}${formatClock(r.endTime)}`)
    .join(", ");
}

export type DaySchedule = {
  dayOfWeek: number;
  label: string;
  ranges: TimeRange[];
};

export function groupSlotsByDay(slots: WeeklyTimeSlot[]): DaySchedule[] {
  const byDay = new Map<number, TimeRange[]>();
  for (const slot of slots) {
    const list = byDay.get(slot.dayOfWeek) ?? [];
    list.push({ startTime: slot.startTime, endTime: slot.endTime });
    byDay.set(slot.dayOfWeek, list);
  }
  return [...byDay.entries()]
    .sort(([a], [b]) => a - b)
    .map(([dayOfWeek, ranges]) => ({
      dayOfWeek,
      label: DAY_LABEL[dayOfWeek] ?? `Ngày ${dayOfWeek}`,
      ranges,
    }));
}

// [1,2,3,4,5] -> "T2–T6"; [4] -> "Thứ 5"; [1,3] -> "T2, T4"
export function summarizeDays(days: number[]): string {
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return DAY_LABEL[sorted[0]] ?? "";
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (consecutive && sorted.length >= 3) {
    return `${DAY_SHORT[sorted[0]]}–${DAY_SHORT[sorted[sorted.length - 1]]}`;
  }
  return sorted.map(d => DAY_SHORT[d] ?? String(d)).join(", ");
}

// Gio tiep nhan cho the dich vu: "T2–T6, 8:00–11:30" khi moi ngay cung khung
// gio, nguoc lai chi liet ke cac ngay.
export function summarizeHours(slots: WeeklyTimeSlot[]): string {
  const days = groupSlotsByDay(slots);
  if (days.length === 0) return "Chưa công bố";
  const dayText = summarizeDays(days.map(d => d.dayOfWeek));
  const first = formatRanges(days[0].ranges, "–");
  const allSame = days.every(d => formatRanges(d.ranges, "–") === first);
  return allSame ? `${dayText}, ${first}` : dayText;
}

// "T2–T6 · 30 phút/lượt"
export function summarizeService(slots: WeeklyTimeSlot[], slotDurationMinutes: number): string {
  const days = summarizeDays(slots.map(s => s.dayOfWeek)) || "Chưa công bố lịch";
  return `${days} · ${slotDurationMinutes} phút/lượt`;
}
