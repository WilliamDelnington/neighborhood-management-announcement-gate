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
            : "Phường Dương Nội, Thành phố Hà Nội."}
        </div>
        <div className={styles.seal}>
          © {year} Phường Dương Nội · congthongtin.phuongduongnoi.quanlytodanpho.com
        </div>
      </div>
    </footer>
  );
}
