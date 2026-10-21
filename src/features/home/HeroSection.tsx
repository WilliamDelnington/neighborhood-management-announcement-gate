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
            Đăng nhập với tài khoản cư dân hoặc tài khoản được ủy quyền
            để sử dụng các dịch vụ của địa phương.
          </span>
          <span className={styles.leadShort}>
            Chọn tài khoản cư dân hoặc tài khoản được ủy quyền để đăng nhập.
          </span>
        </p>
      </div>
    </div>
  );
}
