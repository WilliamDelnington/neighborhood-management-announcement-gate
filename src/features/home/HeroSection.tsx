import { StatChip } from "@/components/common/StatChip";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { data } = usePublicSettings();
  const stats = data?.community_stats;

  return (
    <div className={styles.hero} id="noi-dung">
      <div className="wrap">
        <div className={styles.eyebrow}>Cổng thông tin cư dân</div>
        <h2 className={styles.title}>Bảng tin của Tổ dân phố Hòa Bình</h2>
        <p className={styles.lead}>
          Nơi cư dân theo dõi thông báo, lịch sinh hoạt Chi bộ và Tổ dân phố,
          tra cứu thủ tục hành chính và gửi phản ánh tới Ban công tác.
        </p>
        <div className={styles.statRow}>
          <StatChip
            value={stats ? `${stats.totalHouseholds} hộ` : "—"}
            label="Số hộ dân trong Tổ"
          />
          <StatChip
            value={stats ? `${stats.totalResidents} người` : "—"}
            label="Tổng số nhân khẩu"
          />
          <StatChip value={stats?.leaderName ?? "—"} label="Tổ trưởng đương nhiệm" />
          <StatChip value={stats?.termLabel ?? "—"} label="Nhiệm kỳ hiện tại" />
        </div>
      </div>
    </div>
  );
}
