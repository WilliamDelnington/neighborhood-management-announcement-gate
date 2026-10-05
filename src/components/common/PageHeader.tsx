import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
  // Ten muc tren duong dan "Trang chủ / ..." - mac dinh trung tieu de.
  crumb?: string;
  description?: ReactNode;
  aside?: ReactNode;
};

export function PageHeader({ title, crumb, description, aside }: PageHeaderProps) {
  return (
    <div className={styles.wrap}>
      <nav aria-label="Vị trí trang" className={styles.crumbs}>
        <ol>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li aria-current="page">{crumb ?? title}</li>
        </ol>
      </nav>
      <div className={styles.row}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        {aside}
      </div>
    </div>
  );
}
