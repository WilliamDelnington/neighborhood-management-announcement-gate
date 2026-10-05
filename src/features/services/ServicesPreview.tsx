import { Link } from "react-router-dom";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { RouterLinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { summarizeHours } from "@/utils/schedule";
import { scopeLabel } from "./serviceText";
import { useAppointmentServices } from "./useAppointmentServices";
import styles from "./ServicesPreview.module.css";

const PREVIEW_COUNT = 4;

export function ServicesPreview() {
  const { data, isLoading, isError } = useAppointmentServices();
  const services = (data?.items ?? []).slice(0, PREVIEW_COUNT);

  return (
    <Section id="dich-vu" labelledBy="dich-vu-title">
      <SectionHeading
        id="dich-vu-title"
        title="Dịch vụ & lịch hẹn"
        description="Các thủ tục có thể đặt lịch làm việc trước với phường hoặc Tổ dân phố."
        action={<Link to="/dich-vu">Xem tất cả dịch vụ →</Link>}
      />
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorState message="Không thể tải danh sách dịch vụ. Vui lòng thử lại sau." />
      )}
      {data && services.length === 0 && (
        <EmptyState message="Chưa có dịch vụ nào nhận đặt lịch." />
      )}
      {services.length > 0 && (
        <ul className={styles.grid}>
          {services.map(service => (
            <li key={service._id}>
              <article className={styles.card}>
                <span className={styles.scope}>{scopeLabel(service)}</span>
                <h3 className={styles.name}>{service.name}</h3>
                {service.description && <p className={styles.desc}>{service.description}</p>}
                <div className={styles.facts}>
                  <span>Giờ tiếp nhận: {summarizeHours(service.timeSlots)}</span>
                  <span>Mỗi lượt: {service.slotDurationMinutes} phút</span>
                </div>
                <Link
                  className={styles.cta}
                  to={`/dich-vu?id=${encodeURIComponent(service._id)}`}
                >
                  <span className={styles.ctaText}>Xem lịch & đặt hẹn</span>
                  <span className="visually-hidden">: {service.name}</span>
                  <Icon name="chevron" size={18} className={styles.chevron} />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
      {services.length > 0 && (
        <RouterLinkButton to="/dich-vu" variant="outline" className={styles.mobileMore}>
          Xem tất cả dịch vụ
        </RouterLinkButton>
      )}
    </Section>
  );
}
