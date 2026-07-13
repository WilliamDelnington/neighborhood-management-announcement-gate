import { usePublicSettings } from "@/hooks/usePublicSettings";
import styles from "./Footer.module.css";

export function Footer() {
  const { data } = usePublicSettings();
  const identity = data?.app_identity;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.addr}>
          {identity
            ? `${identity.name}, ${identity.ward}, ${identity.city}.`
            : "Tổ dân phố Hòa Bình, phường Dương Nội."}
        </div>
        <div className={styles.seal}>© {year} TDP Hòa Bình · tdphb-duongnoi.io.vn</div>
      </div>
    </footer>
  );
}
