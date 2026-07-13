import { HeroSection } from "@/features/home/HeroSection";
import { AnnouncementList } from "@/features/announcements/AnnouncementList";
import { MeetingScheduleList } from "@/features/events/MeetingScheduleList";
import { ProcedureList } from "@/features/procedures/ProcedureList";
import { CommitteeGrid } from "@/features/committee/CommitteeGrid";
import { FeedbackSection } from "@/features/feedback/FeedbackSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementList />
      <MeetingScheduleList />
      <ProcedureList />
      <CommitteeGrid />
      <FeedbackSection />
    </>
  );
}
