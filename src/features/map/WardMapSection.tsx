import wardMap from "@/assets/images/ward-map.jpg";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import styles from "./WardMapSection.module.css";

export function WardMapSection({ className }: { className?: string }) {
  const { ward } = useSiteIdentity();

  return (
    <section id="ban-do" className={cn(styles.card, className)} aria-labelledby="ban-do-title">
      <h2 id="ban-do-title" className={styles.title}>
        Bản đồ phường
      </h2>
      <a
        className={styles.frame}
        href={wardMap}
        target="_blank"
        rel="noreferrer"
        aria-label="Xem bản đồ cỡ đầy đủ"
      >
        <img className={styles.map} src={wardMap} alt={`Bản đồ ${ward}`} loading="lazy" />
      </a>
      <a className={styles.more} href={wardMap} target="_blank" rel="noreferrer">
        Mở bản đồ cỡ lớn →
      </a>
    </section>
  );
}
