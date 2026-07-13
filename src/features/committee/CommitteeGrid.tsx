import { Card } from "@/components/ui/Card";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import { telHref } from "@/utils/formatPhone";
import styles from "./CommitteeGrid.module.css";

export function CommitteeGrid() {
  const { data, isLoading, isError } = usePublicSettings();
  const members = data?.committee_members ?? [];

  return (
    <Section id="ban-cong-tac">
      <SectionHeading
        tag="Đầu mối"
        title="Ban công tác Tổ dân phố"
        description="Danh sách cán bộ phụ trách để cư dân liên hệ khi cần hỗ trợ."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải danh sách ban công tác. Vui lòng thử lại sau." />}
      {!isLoading && !isError && members.length === 0 && (
        <EmptyState message="Chưa có thông tin ban công tác." />
      )}
      {members.length > 0 && (
        <div className={styles.grid}>
          {members.map(member => (
            <Card key={`${member.role}-${member.phone}`}>
              <div className={styles.role}>{member.role}</div>
              <div className={styles.name}>{member.name}</div>
              <a className={`${styles.phone} mono`} href={telHref(member.phone)}>
                {member.phone}
              </a>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
