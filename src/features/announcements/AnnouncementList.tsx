import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { AnnouncementCard } from "./AnnouncementCard";
import { useAnnouncements } from "./useAnnouncements";
import styles from "./AnnouncementList.module.css";

export function AnnouncementList() {
  const { data, isLoading, isError } = useAnnouncements();

  return (
    <Section id="thong-bao">
      <SectionHeading
        tag="Bảng tin"
        title="Thông báo mới"
        description="Các thông báo từ phường và các Tổ dân phố, cập nhật thường xuyên tới toàn thể cư dân."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải thông báo. Vui lòng thử lại sau." />}
      {data && data.items.length === 0 && (
        <EmptyState message="Chưa có thông báo nào được đăng." />
      )}
      {data && data.items.length > 0 && (
        <div className={styles.board}>
          {data.items.map(item => (
            <AnnouncementCard key={item._id} announcement={item} />
          ))}
        </div>
      )}
    </Section>
  );
}
