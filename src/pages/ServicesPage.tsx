import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { ServiceDetail } from "@/features/services/ServiceDetail";
import {
  HOLIDAY_TYPE_LABEL,
  SCOPE_FILTERS,
  scopeLabel,
  type ScopeFilter,
} from "@/features/services/serviceText";
import { useAppointmentServices } from "@/features/services/useAppointmentServices";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { summarizeService } from "@/utils/schedule";
import styles from "./ServicesPage.module.css";

export function ServicesPage() {
  useDocumentTitle("Dịch vụ & lịch hẹn");
  const { data, isLoading, isError } = useAppointmentServices();
  const [scope, setScope] = useState<ScopeFilter>("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const detailRef = useRef<HTMLElement>(null);
  const isNarrow = useMediaQuery("(max-width: 900px)");

  const services = data?.items ?? [];
  const holidays = data?.upcomingHolidays ?? [];
  const filtered = services.filter(s => scope === "all" || s.scope === scope);
  const selected = filtered.find(s => s._id === selectedId) ?? filtered[0];

  const select = (id: string) => {
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);
        next.set("id", id);
        return next;
      },
      { replace: true },
    );
    // Tren dien thoai chi tiet nam duoi danh sach - dua nguoi dung xuong do.
    if (isNarrow) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ block: "start" });
        detailRef.current?.focus({ preventScroll: true });
      });
    }
  };

  return (
    <div className={cn("wrap", styles.page)}>
      <PageHeader
        title="Dịch vụ & lịch hẹn"
        description="Chọn dịch vụ để xem giờ tiếp nhận, địa điểm và ngày nghỉ. Việc đặt lịch thực hiện trên ứng dụng cư dân sau khi đăng nhập."
        aside={
          <div role="group" aria-label="Lọc theo cấp" className={styles.chips}>
            {SCOPE_FILTERS.map(filter => (
              <button
                key={filter.value}
                type="button"
                className={cn(styles.chip, filter.value === scope && styles.chipOn)}
                aria-pressed={filter.value === scope}
                onClick={() => setScope(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        }
      />

      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải danh sách dịch vụ. Vui lòng thử lại sau." />}
      {data && services.length === 0 && <EmptyState message="Chưa có dịch vụ nào nhận đặt lịch." />}
      {data && services.length > 0 && filtered.length === 0 && (
        <EmptyState message="Không có dịch vụ nào thuộc cấp này." />
      )}

      {selected && (
        <div className={styles.layout}>
          <ul className={styles.list} aria-label="Danh sách dịch vụ">
            {filtered.map(service => {
              const active = service._id === selected._id;
              return (
                <li key={service._id}>
                  <button
                    type="button"
                    className={cn(styles.item, active && styles.itemOn)}
                    aria-pressed={active}
                    onClick={() => select(service._id)}
                  >
                    <span className={styles.itemScope}>{scopeLabel(service)}</span>
                    <span className={styles.itemName}>{service.name}</span>
                    <span className={styles.itemSummary}>
                      {summarizeService(service.timeSlots, service.slotDurationMinutes)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <ServiceDetail ref={detailRef} service={selected} />
        </div>
      )}

      {data && holidays.length > 0 && (
        <section className={styles.holidays} aria-labelledby="ngay-nghi-title">
          <h2 id="ngay-nghi-title" className={styles.holidaysTitle}>
            Ngày nghỉ chung của phường sắp tới
          </h2>
          <ul className={styles.holidayList}>
            {holidays.map(holiday => (
              <li key={`${holiday.date}-${holiday.name}`} className={styles.holiday}>
                <time dateTime={holiday.date} className={styles.holidayDate}>
                  {formatDate(holiday.date)}
                </time>
                <span className={styles.holidayText}>
                  <strong>{holiday.name}</strong>
                  <span className={styles.meta}>
                    {HOLIDAY_TYPE_LABEL[holiday.type] ?? "Nghỉ"}
                    {holiday.note.trim() ? ` · ${holiday.note.trim()}` : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
