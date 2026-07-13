import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { useProcedureFiles } from "./useProcedureFiles";
import styles from "./ProcedureList.module.css";

export function ProcedureList() {
  const { data, isLoading, isError } = useProcedureFiles();

  return (
    <Section id="thu-tuc">
      <SectionHeading
        tag="Hỗ trợ hành chính"
        title="Thủ tục và biểu mẫu"
        description="Các thủ tục thường gặp của cư dân trong Tổ. Liên hệ Tổ trưởng để được hướng dẫn nộp hồ sơ."
      />
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorState message="Không thể tải danh sách biểu mẫu. Vui lòng thử lại sau." />}
      {data && data.items.length === 0 && (
        <EmptyState message="Chưa có biểu mẫu nào được đăng tải." />
      )}
      {data && data.items.length > 0 && (
        <div className={styles.list}>
          {data.items.map(file => (
            <div key={file._id} className={styles.item}>
              <div>
                <div className={styles.title}>{file.name}</div>
                {file.description && <div className={styles.desc}>{file.description}</div>}
              </div>
              <LinkButton href={file.url} target="_blank" rel="noreferrer">
                Tải biểu mẫu
              </LinkButton>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
