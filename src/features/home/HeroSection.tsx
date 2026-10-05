import type { CSSProperties } from "react";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { wardInSentence, billboardUrl } = useSiteIdentity();
  const style: CSSProperties | undefined = billboardUrl
    ? { backgroundImage: `url("${billboardUrl.replace(/["\\\n]/g, encodeURIComponent)}")` }
    : undefined;

  return (
    <div className={cn(styles.hero, billboardUrl && styles.withImage)} style={style}>
      <div className={cn("wrap", styles.inner)}>
        <h1 className={styles.title}>Thông tin và dịch vụ cho cư dân {wardInSentence}</h1>
        <p className={styles.lead}>
          <span className={styles.leadLong}>
            Tra cứu thủ tục, đặt lịch làm việc với phường, tìm liên hệ Tổ dân phố và theo
            dõi tin tức, lịch họp tại địa phương.
          </span>
          <span className={styles.leadShort}>
            Thủ tục, lịch hẹn, liên hệ Tổ dân phố, tin tức và lịch họp.
          </span>
        </p>
      </div>
    </div>
  );
}
