import { Card } from "@/components/ui/Card";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { formatDateTime } from "@/utils/formatDate";
import { useMeetings } from "./useMeetings";
import styles from "./MeetingScheduleList.module.css";

export function MeetingScheduleList() {
  const { data, isLoading, isError } = useMeetings();

  return (
    <Section id="lich-sinh-hoat">
      <SectionHeading
        tag="Định kỳ"
        title="Lịch sinh hoạt"
        description="Các cuộc họp Chi bộ và Tổ dân phố sắp diễn ra."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải lịch sinh hoạt. Vui lòng thử lại sau." />}
      {data && data.items.length === 0 && (
        <EmptyState message="Chưa có lịch họp nào sắp tới." />
      )}
      {data && data.items.length > 0 && (
        <div className={styles.grid}>
          {data.items.map(meeting => (
            <Card key={meeting._id} className={styles.card}>
              <h3>{meeting.title}</h3>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td>Thời gian</td>
                    <td>{formatDateTime(meeting.startTime)}</td>
                  </tr>
                  <tr>
                    <td>Địa điểm</td>
                    <td>{meeting.location}</td>
                  </tr>
                  <tr>
                    <td>Nội dung</td>
                    <td>{meeting.content}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
