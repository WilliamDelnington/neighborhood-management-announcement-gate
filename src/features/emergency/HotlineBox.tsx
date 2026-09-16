import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import { telHref } from "@/utils/formatPhone";
import styles from "./HotlineBox.module.css";

export function HotlineBox() {
  const { data, isLoading, isError } = usePublicSettings();
  const contacts = data?.emergency_contacts ?? [];

  return (
    <div className={styles.box}>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải số điện thoại khẩn cấp." />}
      {!isLoading && !isError && contacts.length === 0 && (
        <EmptyState message="Chưa có số điện thoại khẩn cấp." />
      )}
      {contacts.length > 0 && (
        <ul className={styles.list}>
          {contacts.map(contact => (
            <li key={contact.label}>
              <span>{contact.label}</span>
              <a className={styles.num} href={telHref(contact.phone)}>
                {contact.phone}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
