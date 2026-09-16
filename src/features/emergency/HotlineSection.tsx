import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HotlineBox } from "./HotlineBox";

export function HotlineSection() {
  return (
    <Section id="khan-cap">
      <SectionHeading
        tag="Hỗ trợ"
        title="Số điện thoại khẩn cấp"
        description="Các số điện thoại liên hệ khi cần hỗ trợ gấp."
      />
      <HotlineBox />
    </Section>
  );
}
