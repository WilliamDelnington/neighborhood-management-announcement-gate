import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { formatDate, formatDayMonth, formatTimeOfDay } from "@/utils/formatDate";
import { useUpcomingMeetings } from "./useUpcomingMeetings";
import styles from "./MeetingsSection.module.css";

export function MeetingsSection() {
  const { data, isLoading, isError } = useUpcomingMeetings(3);
  const meetings = data?.items ?? [];

  return (
    <Section id="lich-hop" labelledBy="lich-hop-title">
      <SectionHeading
        id="lich-hop-title"
        title="Lịch họp sắp tới"
        description="Các cuộc họp công khai của phường và Tổ dân phố."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải lịch họp. Vui lòng thử lại sau." />}
      {data && meetings.length === 0 && (
        <EmptyState message="Chưa có cuộc họp nào sắp diễn ra." />
      )}
      {meetings.length > 0 && (
        <ul className={styles.grid}>
          {meetings.map(meeting => {
            const { day, month } = formatDayMonth(meeting.startTime);
            const location = meeting.location?.trim();
            return (
              <li key={meeting._id} className={styles.card}>
                <time className={styles.date} dateTime={meeting.startTime}>
                  <span className={styles.day}>{day}</span>
                  <span className={styles.month}>{month}</span>
                  <span className="visually-hidden">{formatDate(meeting.startTime)}</span>
                </time>
                <div className={styles.body}>
                  <strong className={styles.title}>{meeting.title}</strong>
                  <span className={styles.meta}>
                    {formatTimeOfDay(meeting.startTime)}
                    {location ? ` · ${location}` : ""}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}
