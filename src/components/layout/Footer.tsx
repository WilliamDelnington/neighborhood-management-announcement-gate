import { useEmergencyContacts } from "@/features/emergency/useEmergencyContacts";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import styles from "./Footer.module.css";

export function Footer() {
  const { identity, unitName } = useSiteIdentity();
  const { contacts } = useEmergencyContacts();
  const year = new Date().getFullYear();

  const address = identity?.address?.trim();
  const phone = identity?.phone?.trim();
  const email = identity?.email?.trim();
  const officeHours = (identity?.officeHours ?? "")
    .split(/\r?\n|;/)
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <footer id="lien-he" className={styles.footer} tabIndex={-1}>
      <div className={cn("wrap", styles.grid)}>
        <div className={styles.col}>
          <strong className={styles.unit}>{unitName}</strong>
          {address && <span>{address}</span>}
          {phone && (
            <span>
              Điện thoại: <a href={telHref(phone)}>{phone}</a>
            </span>
          )}
          {email && (
            <span>
              Email: <a href={`mailto:${email}`}>{email}</a>
            </span>
          )}
        </div>

        {officeHours.length > 0 && (
          <div className={styles.col}>
            <strong className={styles.colTitle}>Giờ làm việc</strong>
            {officeHours.map(line => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}

        <div className={styles.col}>
          <strong className={styles.colTitle}>Khẩn cấp</strong>
          <ul className={styles.hotlines}>
            {contacts.map(contact => (
              <li key={`${contact.label}-${contact.phone}`}>
                <a className={styles.hotline} href={telHref(contact.phone)}>
                  <span className={styles.hotlinePhone}>{contact.phone}</span>
                  <span className={styles.hotlineSep} aria-hidden="true">
                    {" – "}
                  </span>
                  <span className={styles.hotlineLabel}>{contact.shortLabel}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cn("wrap", styles.bottom)}>
        © {year} {unitName}
      </div>
    </footer>
  );
}
