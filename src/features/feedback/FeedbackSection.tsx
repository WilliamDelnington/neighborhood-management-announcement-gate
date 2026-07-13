import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HotlineBox } from "@/features/emergency/HotlineBox";
import { ComplaintForm } from "./ComplaintForm";
import { ComplaintLookup } from "./ComplaintLookup";
import styles from "./FeedbackSection.module.css";

export function FeedbackSection() {
  return (
    <Section id="phan-anh">
      <SectionHeading
        tag="Tiếp nhận ý kiến"
        title="Phản ánh, kiến nghị"
        description="Gửi ý kiến, kiến nghị của hộ gia đình tới Ban công tác Tổ dân phố."
      />
      <div className={styles.grid}>
        <div>
          <ComplaintForm />
          <ComplaintLookup />
        </div>
        <HotlineBox />
      </div>
    </Section>
  );
}
