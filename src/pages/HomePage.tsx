import { HeroSection } from "@/features/home/HeroSection";
import { AnnouncementList } from "@/features/announcements/AnnouncementList";
import { WardMapSection } from "@/features/map/WardMapSection";
import { LinksSection } from "@/features/links/LinksSection";
import { HotlineSection } from "@/features/emergency/HotlineSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementList />
      <WardMapSection />
      <LinksSection />
      <HotlineSection />
    </>
  );
}
