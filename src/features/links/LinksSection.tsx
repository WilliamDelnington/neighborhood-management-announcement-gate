import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { cn } from "@/utils/cn";
import { resolveAssetUrl } from "@/utils/resolveAssetUrl";
import { useUtilityApps } from "./useUtilityApps";
import styles from "./LinksSection.module.css";

export function LinksSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useUtilityApps();
  const apps = (data?.items ?? []).filter(app => app.active !== false);

  return (
    <section id="lien-ket" className={cn(styles.card, className)} aria-labelledby="lien-ket-title">
      <h2 id="lien-ket-title" className={styles.title}>
        Liên kết dịch vụ số
      </h2>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải danh sách liên kết. Vui lòng thử lại sau." />}
      {data && apps.length === 0 && <EmptyState message="Chưa có liên kết nào được đăng tải." />}
      {apps.length > 0 && (
        <ul className={styles.grid}>
          {apps.map(app => {
            const icon = resolveAssetUrl(app.icon);
            return (
              <li key={app._id}>
                <a className={styles.link} href={app.url} target="_blank" rel="noreferrer">
                  {icon && <img className={styles.icon} src={icon} alt="" loading="lazy" />}
                  <span className={styles.name}>{app.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
