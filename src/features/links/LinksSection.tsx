import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { useUtilityApps } from "./useUtilityApps";
import styles from "./LinksSection.module.css";

export function LinksSection() {
  const { data, isLoading, isError } = useUtilityApps();
  const apps = data?.items ?? [];

  return (
    <Section id="lien-ket">
      <SectionHeading
        tag="Dịch vụ số"
        title="Liên kết"
        description="Các cổng thông tin và dịch vụ số khác của phường Dương Nội."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải danh sách liên kết. Vui lòng thử lại sau." />}
      {!isLoading && !isError && apps.length === 0 && (
        <EmptyState message="Chưa có liên kết nào được đăng tải." />
      )}
      {apps.length > 0 && (
        <div className={styles.grid}>
          {apps.map(app => (
            <a
              key={app._id}
              className={styles.card}
              href={app.url}
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.icon} src={app.icon} alt="" />
              <span className={styles.name}>{app.name}</span>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
