import { forwardRef } from "react";
import { RESIDENT_APP_URL } from "@/constants/env";
import type { PublicAppointmentService } from "@/types/appointmentService";
import { formatRanges, groupSlotsByDay } from "@/utils/schedule";
import { describeException, scopeLabel } from "./serviceText";
import styles from "./ServiceDetail.module.css";

type ServiceDetailProps = {
  service: PublicAppointmentService;
};

export const ServiceDetail = forwardRef<HTMLElement, ServiceDetailProps>(function ServiceDetail(
  { service },
  ref,
) {
  const days = groupSlotsByDay(service.timeSlots);
  const location = service.locationAddress?.trim();

  return (
    <article
      ref={ref}
      className={styles.card}
      aria-labelledby="dich-vu-chi-tiet"
      tabIndex={-1}
    >
      <div className={styles.head}>
        <span className={styles.scope}>{scopeLabel(service)}</span>
        <h2 id="dich-vu-chi-tiet" className={styles.name}>
          {service.name}
        </h2>
        {service.description && <p className={styles.desc}>{service.description}</p>}
      </div>

      <div className={styles.facts}>
        <div className={styles.fact}>
          <span className={styles.meta}>Địa điểm</span>
          <strong>{location || "Chưa cập nhật"}</strong>
        </div>
        <div className={styles.fact}>
          <span className={styles.meta}>Thời lượng mỗi lượt</span>
          <strong>{service.slotDurationMinutes} phút</strong>
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>Giờ tiếp nhận trong tuần</h3>
        {days.length === 0 ? (
          <p className={styles.meta}>Dịch vụ chưa công bố khung giờ tiếp nhận.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Ngày</th>
                  <th scope="col">Khung giờ</th>
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day.dayOfWeek}>
                    <td>{day.label}</td>
                    <td>{formatRanges(day.ranges)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {service.upcomingExceptions.length > 0 && (
        <div className={styles.notice}>
          <strong>Ngày nghỉ / thay đổi sắp tới:</strong>
          <ul>
            {service.upcomingExceptions.map(exception => (
              <li key={`${exception.date}-${exception.type}`}>{describeException(exception)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.cta}>
        {RESIDENT_APP_URL ? (
          <a className={styles.ctaButton} href={RESIDENT_APP_URL} target="_blank" rel="noreferrer">
            Đặt lịch trên ứng dụng cư dân
          </a>
        ) : (
          <strong className={styles.ctaText}>Đặt lịch trên ứng dụng cư dân</strong>
        )}
        <span className={styles.meta}>Cần đăng nhập bằng tài khoản cư dân để chọn giờ.</span>
      </div>
    </article>
  );
});
