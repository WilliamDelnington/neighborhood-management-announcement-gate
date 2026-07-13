import styles from "./StatChip.module.css";

export function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.chip}>
      <div className={styles.num}>{value}</div>
      <div className={styles.lbl}>{label}</div>
    </div>
  );
}
