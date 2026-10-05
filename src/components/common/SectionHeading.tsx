import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  title: string;
  id?: string;
  description?: string;
  // Lien ket "Xem tat ca ..." ben phai tieu de.
  action?: ReactNode;
};

export function SectionHeading({ title, id, description, action }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      <div>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
