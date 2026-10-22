import { AnnouncementPanel } from "@/features/announcements/AnnouncementPanel";
import { HeroSection } from "@/features/home/HeroSection";
import { LinksSection } from "@/features/links/LinksSection";
import { WardMapSection } from "@/features/map/WardMapSection";
import { NeighborhoodsPreview } from "@/features/neighborhoods/NeighborhoodsPreview";
import { NewsSection } from "@/features/news/NewsSection";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/utils/cn";
import styles from "./HomePage.module.css";

export function HomePage() {
  useDocumentTitle();

  return (
    <>
      <HeroSection />
      <div className={cn("wrap", styles.mapSection)}>
        <WardMapSection />
      </div>
      <NeighborhoodsPreview />

      <div className={cn("wrap", styles.newsRow)}>
        <NewsSection className={styles.news} />
        <AnnouncementPanel className={styles.notices} />
      </div>

      <div className={cn("wrap", styles.extras)}>
        <LinksSection />
      </div>
    </>
  );
}
