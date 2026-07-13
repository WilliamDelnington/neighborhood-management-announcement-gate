import { cn } from "@/utils/cn";
import styles from "./Badge.module.css";

export type BadgeVariant = "khan" | "thuong" | "sukien";

const BADGE_LABEL: Record<BadgeVariant, string> = {
  khan: "Khẩn",
  thuong: "Thông thường",
  sukien: "Sự kiện",
};

export function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span className={cn(styles.badge, styles[variant])}>
      {BADGE_LABEL[variant]}
    </span>
  );
}
