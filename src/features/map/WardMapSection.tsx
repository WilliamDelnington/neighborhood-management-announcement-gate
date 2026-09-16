import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import wardMap from "@/assets/images/ward-map.jpg";
import styles from "./WardMapSection.module.css";

export function WardMapSection() {
  return (
    <Section id="ban-do">
      <SectionHeading
        tag="Địa giới hành chính"
        title="Bản đồ phường Dương Nội"
        description="Ranh giới các Tổ dân phố thuộc phường Dương Nội theo phương án sắp xếp, tổ chức lại."
      />
      <a
        className={styles.frame}
        href={wardMap}
        target="_blank"
        rel="noreferrer"
        aria-label="Xem bản đồ cỡ đầy đủ"
      >
        <img className={styles.map} src={wardMap} alt="Bản đồ phường Dương Nội" />
      </a>
    </Section>
  );
}
