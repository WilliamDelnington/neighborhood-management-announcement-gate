import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <div className={styles.hero} id="noi-dung">
      <div className="wrap">
        <div className={styles.eyebrow}>Phường Dương Nội</div>
        <h2 className={styles.title}>Cổng thông tin của phường Dương Nội</h2>
        <p className={styles.lead}>
          Nơi cư dân theo dõi thông báo, tra cứu bản đồ phường, các liên kết
          dịch vụ số và gửi phản ánh.
        </p>
      </div>
    </div>
  );
}
