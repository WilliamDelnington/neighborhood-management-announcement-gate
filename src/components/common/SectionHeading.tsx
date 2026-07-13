import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  tag: string;
  title: string;
  description?: string;
};

export function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      <div>
        <div className={styles.tag}>{tag}</div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </div>
  );
}
