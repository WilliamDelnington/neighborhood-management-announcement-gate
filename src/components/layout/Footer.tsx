import { useMemo } from "react";
import { useEmergencyContacts } from "@/features/emergency/useEmergencyContacts";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import styles from "./Footer.module.css";

export function Footer() {
  const { identity, unitName } = useSiteIdentity();
  const { contacts } = useEmergencyContacts();
  const { data } = usePublicSettings();
  const footer = data?.announcement_gate_footer;
  const footerUnitName = (footer?.unitName ?? unitName).trim();
  const content = useMemo(() => sanitizeHtml(footer?.content ?? ""), [footer?.content]);
  const year = new Date().getFullYear();

  const address = (footer?.address ?? identity?.address)?.trim();
  const phone = (footer?.phone ?? identity?.phone)?.trim();
  const email = (footer?.email ?? identity?.email)?.trim();
  const officeHours = (footer?.officeHours ?? identity?.officeHours ?? "")
    .split(/\r?\n|;/)
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <footer id="lien-he" className={styles.footer} tabIndex={-1}>
      <div className={cn("wrap", styles.grid)}>
        {(footerUnitName || address || phone || email) && <div className={styles.col}>
          {footerUnitName && <strong className={styles.unit}>{footerUnitName}</strong>}
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
        </div>}

        {officeHours.length > 0 && (
          <div className={styles.col}>
            <strong className={styles.colTitle}>Giờ làm việc</strong>
            {officeHours.map(line => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}

        {content && (
          <div className={cn(styles.col, styles.content)} dangerouslySetInnerHTML={{ __html: content }} />
        )}

        {footer?.showEmergencyContacts !== false && <div className={styles.col}>
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
        </div>}
      </div>
      <div className={cn("wrap", styles.bottom)}>
        {footer?.copyright?.trim() || `© ${year} ${footerUnitName || unitName}`}
      </div>
    </footer>
  );
}
