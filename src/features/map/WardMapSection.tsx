import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import styles from "./WardMapSection.module.css";

export function WardMapSection({ className }: { className?: string }) {
  const { ward, city } = useSiteIdentity();
  const location = `${ward}, ${city}, Việt Nam`;
  const query = encodeURIComponent(location);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section id="ban-do" className={cn(styles.card, className)} aria-labelledby="ban-do-title">
      <h2 id="ban-do-title" className={styles.title}>
        Bản đồ phường
      </h2>
      <p className={styles.description}>Kéo để di chuyển, phóng to hoặc thu nhỏ để khám phá {ward}.</p>
      <div className={styles.frame}>
        <iframe
          className={styles.map}
          title={`Bản đồ tương tác ${ward}`}
          src={`https://maps.google.com/maps?q=${query}&z=14&hl=vi&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a className={styles.more} href={mapHref} target="_blank" rel="noopener noreferrer">
        Mở trên Google Maps →
      </a>
    </section>
  );
}
