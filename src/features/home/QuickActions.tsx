import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RESIDENT_APP_URL } from "@/constants/env";
import { cn } from "@/utils/cn";
import styles from "./QuickActions.module.css";

type Action = {
  key: string;
  icon: IconName;
  // Nhan day du (may tinh) va nhan ngan (dien thoai, luoi 2x2).
  label: string;
  shortLabel: string;
  description: string;
  danger?: boolean;
  to?: string;
  href?: string;
};

const ACTIONS: Action[] = [
  {
    key: "dat-lich",
    icon: "calendar",
    label: "Đặt lịch hẹn",
    shortLabel: "Đặt lịch hẹn",
    description: "Chọn dịch vụ, xem giờ tiếp nhận và đặt lịch",
    to: "/dich-vu",
  },
  {
    key: "to-dan-pho",
    icon: "pin",
    label: "Tìm Tổ dân phố của tôi",
    shortLabel: "Tổ dân phố của tôi",
    description: "Tổ trưởng và số liên hệ chính thức của tổ",
    to: "/to-dan-pho",
  },
  {
    key: "phan-anh",
    icon: "chat",
    label: "Gửi phản ánh",
    shortLabel: "Gửi phản ánh",
    description: "Qua ứng dụng cư dân trên Zalo",
    ...(RESIDENT_APP_URL ? { href: RESIDENT_APP_URL } : { to: "#lien-he" }),
  },
  {
    key: "lien-he",
    icon: "phone",
    label: "Liên hệ & giờ làm việc",
    shortLabel: "Số khẩn cấp",
    description: "Trụ sở UBND phường, số điện thoại",
    danger: true,
    to: "#lien-he",
  },
];

function ActionLink({ action, children }: { action: Action; children: ReactNode }) {
  const className = cn(styles.card, action.danger && styles.danger);
  if (action.href) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={action.to ?? "/"}>
      {children}
    </Link>
  );
}

export function QuickActions() {
  return (
    <nav aria-label="Truy cập nhanh" className={cn("wrap", styles.wrap)}>
      <ul className={styles.grid}>
        {ACTIONS.map(action => (
          <li key={action.key}>
            <ActionLink action={action}>
              <span className={styles.icon}>
                <Icon name={action.icon} />
              </span>
              <span className={styles.text}>
                <strong className={styles.label}>
                  <span className={styles.long}>{action.label}</span>
                  <span className={styles.short}>{action.shortLabel}</span>
                </strong>
                <span className={styles.desc}>{action.description}</span>
              </span>
            </ActionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
