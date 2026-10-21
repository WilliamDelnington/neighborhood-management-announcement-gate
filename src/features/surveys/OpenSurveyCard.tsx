import { residentAppHref } from "@/constants/env";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { useOpenSurvey } from "./useOpenSurvey";
import styles from "./OpenSurveyCard.module.css";

// Chi hien khi API tra ve it nhat 1 khao sat dang mo. Dang tai / loi / khong
// co khao sat -> khong render gi (khoi nay la phu, khong chiem cho trong).
export function OpenSurveyCard({ className }: { className?: string }) {
  const { data: survey } = useOpenSurvey();
  if (!survey) return null;
  const surveyHref = residentAppHref(`/surveys/${encodeURIComponent(survey._id)}`);

  return (
    <aside className={cn(styles.card, className)} aria-labelledby="khao-sat-title">
      <h2 id="khao-sat-title" className={styles.heading}>
        Khảo sát đang mở
      </h2>
      <div className={styles.body}>
        <strong className={styles.title}>{survey.title}</strong>
        {survey.description && <p className={styles.desc}>{survey.description}</p>}
        {survey.closeDate && (
          <span className={styles.meta}>Hạn góp ý: {formatDate(survey.closeDate)}</span>
        )}
      </div>
      {surveyHref ? (
        <a className={styles.cta} href={surveyHref}>
          Tham gia trên ứng dụng cư dân
        </a>
      ) : (
        <p className={styles.ctaText}>Tham gia trên ứng dụng cư dân</p>
      )}
    </aside>
  );
}
