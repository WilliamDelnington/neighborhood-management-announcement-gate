import type { PublicNeighborhood } from "@/types/neighborhood";
import { telHref } from "@/utils/formatPhone";
import styles from "./NeighborhoodCard.module.css";

export function NeighborhoodCard({ neighborhood }: { neighborhood: PublicNeighborhood }) {
  const phone = neighborhood.contactPhone.trim();
  const area = [...neighborhood.streets, ...neighborhood.alleyDescriptions]
    .map(part => part.trim())
    .filter(Boolean)
    .join(", ");
  const address = neighborhood.address.trim();
  const description = neighborhood.description.trim();

  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{neighborhood.name}</h2>
      <dl className={styles.facts}>
        <div>
          <dt>Tổ trưởng:</dt>
          <dd>{neighborhood.leaderName || "Chưa cập nhật"}</dd>
        </div>
        {area && (
          <div>
            <dt>Khu vực:</dt>
            <dd>{area}</dd>
          </div>
        )}
        {address && (
          <div>
            <dt>Địa chỉ:</dt>
            <dd>{address}</dd>
          </div>
        )}
      </dl>
      {description && <p className={styles.desc}>{description}</p>}
      <div className={styles.contact}>
        <span className={styles.contactText}>
          <span className={styles.contactLabel}>Số liên hệ của tổ</span>
          {phone ? (
            <strong className={styles.phone}>{phone}</strong>
          ) : (
            <span className={styles.noPhone}>Chưa công bố số liên hệ</span>
          )}
        </span>
        {phone && (
          <a
            className={styles.call}
            href={telHref(phone)}
            aria-label={`Gọi ${neighborhood.name}: ${phone}`}
          >
            Gọi tổ
          </a>
        )}
      </div>
    </article>
  );
}
