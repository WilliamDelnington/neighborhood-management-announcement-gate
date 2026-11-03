import { useEffect, useState } from "react";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import styles from "./HeroSection.module.css";

// Anh banner (tai len o admin > Cổng thông tin điện tử) rong het man hinh,
// chieu cao bi gioi han de khong chiem tron man hinh. Co anh thi an dai tieu
// de (chi giu h1 cho trinh doc man hinh); chua co anh (hoac anh loi) thi hien
// dai mau voi tieu de va mo ta.
export function HeroSection() {
  const { wardInSentence, billboardUrl } = useSiteIdentity();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [billboardUrl]);

  const showImage = !!billboardUrl && !imageFailed;
  const title = `Thông tin và dịch vụ cho cư dân ${wardInSentence}`;

  if (showImage) {
    return (
      <div className={styles.hero}>
        <h1 className="visually-hidden">{title}</h1>
        <img
          className={styles.banner}
          src={billboardUrl}
          alt={`Ảnh banner cổng thông tin ${wardInSentence}`}
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <div className={cn("wrap", styles.inner)}>
        <h1 className={styles.title}>{title}</h1>
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
