import { Icon, type IconName } from "@/components/ui/Icon";
import { authorizedLoginHref, residentAppHref } from "@/constants/env";
import { cn } from "@/utils/cn";
import styles from "./QuickActions.module.css";

type SignInOption = {
  key: string;
  icon: IconName;
  label: string;
  description: string;
  href?: string;
};

const OPTIONS: SignInOption[] = [
  {
    key: "citizen",
    icon: "user",
    label: "Đăng nhập cư dân",
    description: "Dành cho cư dân sử dụng dịch vụ, gửi phản ánh và tham gia khảo sát tại địa phương.",
    href: residentAppHref("/login"),
  },
  {
    key: "authorized",
    icon: "shield",
    label: "Đăng nhập người dùng được ủy quyền",
    description: "Dành cho cán bộ và người dùng được cấp quyền quản lý thông tin, dịch vụ tại địa phương.",
    href: authorizedLoginHref(),
  },
];

export function QuickActions() {
  return (
    <section aria-label="Chọn hình thức đăng nhập" className={cn("wrap", styles.wrap)}>
      <ul className={styles.grid}>
        {OPTIONS.map(option => (
          <li key={option.key} className={styles.card}>
            <span className={styles.icon}><Icon name={option.icon} size={26} /></span>
            <div className={styles.text}>
              <h2 className={styles.label}>{option.label}</h2>
              <p className={styles.desc}>{option.description}</p>
              {option.href ? (
                <a className={styles.signIn} href={option.href}>
                  {option.label}<Icon name="chevron" size={18} />
                </a>
              ) : (
                <span className={styles.unavailable}>Đăng nhập hiện chưa khả dụng</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
