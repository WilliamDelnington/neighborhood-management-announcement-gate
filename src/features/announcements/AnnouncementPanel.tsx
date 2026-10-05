import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { Badge } from "@/components/ui/Badge";
import { getAnnouncementBadgeVariant } from "@/types/announcement";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { useAnnouncements } from "./useAnnouncements";
import styles from "./AnnouncementPanel.module.css";

// Khoi "Thông báo" o cot phai trang chu. Thong bao khong co trang chi tiet nen
// moi dong la <details>: bam tieu de de mo noi dung ngay tai cho.
export function AnnouncementPanel({ className }: { className?: string }) {
  const { data, isLoading, isError } = useAnnouncements(5);
  const items = data?.items ?? [];

  return (
    <aside className={cn(styles.panel, className)} aria-labelledby="thong-bao-title">
      <h2 id="thong-bao-title" className={styles.heading}>
        Thông báo
      </h2>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải thông báo. Vui lòng thử lại sau." />}
      {data && items.length === 0 && <EmptyState message="Chưa có thông báo nào được đăng." />}
      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map(item => {
            const variant = getAnnouncementBadgeVariant(item);
            return (
              <li key={item._id} className={styles.item}>
                <details className={styles.details}>
                  <summary className={styles.summary}>
                    <span className={styles.metaRow}>
                      <span className={styles.date}>
                        {formatDate(item.publishedAt ?? item.createdAt)}
                      </span>
                      {variant !== "thuong" && <Badge variant={variant} />}
                    </span>
                    <span className={styles.title}>{item.title}</span>
                  </summary>
                  <p className={styles.content}>{item.content}</p>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
