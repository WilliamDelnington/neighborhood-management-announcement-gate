import type { PublicNeighborhood } from "@/types/neighborhood";
import styles from "./NeighborhoodHeadquarters.module.css";

export function NeighborhoodHeadquarters({ neighborhood }: { neighborhood: PublicNeighborhood }) {
  const address = neighborhood.address?.trim();
  const query = [address, neighborhood.wardName, "Việt Nam"].filter(Boolean).join(", ");
  return (
    <div className={styles.headquarters}>
      <span>Trụ sở: {address || "Chưa cập nhật"}</span>
      {address && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chỉ đường đến trụ sở ${neighborhood.name}`}
        >
          Chỉ đường →
        </a>
      )}
    </div>
  );
}
