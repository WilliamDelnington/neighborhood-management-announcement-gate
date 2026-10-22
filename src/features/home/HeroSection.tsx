import { useEffect, useState } from "react";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import styles from "./HeroSection.module.css";

// Anh banner (tai len o admin > Cổng thông tin điện tử) hien TRON VEN theo
// dung ti le anh, rong het man hinh - khong cat nhu anh nen. Tieu de nam o
// dai mau ben duoi anh. Chua co anh (hoac anh loi) thi chi con dai mau.
export function HeroSection() {
  const { wardInSentence, billboardUrl } = useSiteIdentity();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [billboardUrl]);

  const showImage = !!billboardUrl && !imageFailed;

  return (
    <div className={styles.hero}>
      {showImage && (
        <img
          className={styles.banner}
          src={billboardUrl}
          alt={`Ảnh banner cổng thông tin ${wardInSentence}`}
          onError={() => setImageFailed(true)}
        />
      )}
      <div className={cn("wrap", styles.inner, showImage && styles.innerUnderImage)}>
        <h1 className={styles.title}>Thông tin và dịch vụ cho cư dân {wardInSentence}</h1>
        <p className={styles.lead}>
          <span className={styles.leadLong}>
            Tra cứu bản đồ, thông tin Tổ dân phố và theo dõi tin tức,
            thông báo tại địa phương.
          </span>
          <span className={styles.leadShort}>
            Bản đồ, thông tin Tổ dân phố và tin tức địa phương.
          </span>
        </p>
      </div>
    </div>
  );
}
