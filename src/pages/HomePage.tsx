import { HeroSection } from "@/features/home/HeroSection";
import { AnnouncementList } from "@/features/announcements/AnnouncementList";
import { WardMapSection } from "@/features/map/WardMapSection";
import { LinksSection } from "@/features/links/LinksSection";
import { FeedbackSection } from "@/features/feedback/FeedbackSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementList />
      <WardMapSection />
      <LinksSection />
      <FeedbackSection />
    </>
  );
}
