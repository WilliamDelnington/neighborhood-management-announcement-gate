import type {
  AppointmentException,
  AppointmentHoliday,
  PublicAppointmentService,
} from "@/types/appointmentService";
import { formatDateRange } from "@/utils/formatDate";
import { formatRanges } from "@/utils/schedule";

export type ScopeFilter = "all" | "ward" | "neighborhood";

export const SCOPE_FILTERS: { value: ScopeFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "ward", label: "Cấp phường" },
  { value: "neighborhood", label: "Tổ dân phố" },
];

export function scopeLabel(service: PublicAppointmentService): string {
  if (service.scope === "ward") return "Cấp phường";
  return service.neighborhood?.name || "Tổ dân phố";
}

export function describeException(exception: AppointmentException): string {
  const when = formatDateRange(exception.date, exception.endDate);
  const what =
    exception.type === "closed"
      ? "Nghỉ"
      : exception.timeSlots.length > 0
        ? `Đổi giờ: ${formatRanges(exception.timeSlots)}`
        : "Đổi giờ tiếp nhận";
  const note = exception.note.trim();
  return `${when} · ${what}${note ? ` (${note})` : ""}`;
}

export const HOLIDAY_TYPE_LABEL: Record<AppointmentHoliday["type"], string> = {
  le: "Ngày lễ",
  tam_ngung: "Tạm ngưng",
};
