import styles from "./StatusStates.module.css";

export function LoadingSpinner() {
  return (
    <div className={styles.state} role="status" aria-label="Đang tải">
      <div className={styles.spinner} />
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <div className={styles.state}>{message}</div>;
}

export function ErrorState({ message }: { message: string }) {
  return <div className={`${styles.state} ${styles.error}`}>{message}</div>;
}
