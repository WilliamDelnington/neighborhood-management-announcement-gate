import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/utils/formatDate";
import { getAnnouncementBadgeVariant, type Announcement } from "@/types/announcement";
import styles from "./AnnouncementCard.module.css";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <Card className={styles.notice}>
      <div className={styles.topRow}>
        <Badge variant={getAnnouncementBadgeVariant(announcement)} />
        <span className={`${styles.date} mono`}>
          {formatDate(announcement.publishedAt ?? announcement.createdAt)}
        </span>
      </div>
      <h3 className={styles.title}>{announcement.title}</h3>
      <p className={styles.body}>{announcement.content}</p>
    </Card>
  );
}
