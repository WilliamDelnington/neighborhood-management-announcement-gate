import { AnnouncementPanel } from "@/features/announcements/AnnouncementPanel";
import { HeroSection } from "@/features/home/HeroSection";
import { LinksSection } from "@/features/links/LinksSection";
import { WardMapSection } from "@/features/map/WardMapSection";
import { NeighborhoodsPreview } from "@/features/neighborhoods/NeighborhoodsPreview";
import { NewsSection } from "@/features/news/NewsSection";
import { OpenSurveyCard } from "@/features/surveys/OpenSurveyCard";
import { useOpenSurvey } from "@/features/surveys/useOpenSurvey";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/utils/cn";
import styles from "./HomePage.module.css";

export function HomePage() {
  useDocumentTitle();
  // Dung chung cache voi OpenSurveyCard - chi de biet co can chua cho khoi
  // khao sat trong bo cuc hay khong.
  const { data: openSurvey } = useOpenSurvey();

  return (
    <>
      <HeroSection />
      <div className={cn("wrap", styles.mapSection)}>
        <WardMapSection />
      </div>
      <NeighborhoodsPreview />

      <div className={cn("wrap", styles.newsRow, openSurvey && styles.withSurvey)}>
        <NewsSection className={styles.news} />
        <OpenSurveyCard className={styles.survey} />
        <AnnouncementPanel className={styles.notices} />
      </div>

      <div className={cn("wrap", styles.extras)}>
        <LinksSection />
      </div>
    </>
  );
}
