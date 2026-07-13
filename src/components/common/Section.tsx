import type { ReactNode } from "react";
import styles from "./Section.module.css";

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className={styles.section}>
      <div className="wrap">{children}</div>
    </section>
  );
}
