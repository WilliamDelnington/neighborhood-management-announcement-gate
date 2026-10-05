import { apiRequest } from "@/services/api/client";
import type { PaginatedData } from "@/types/api";
import type { Meeting } from "@/types/meeting";

export function getUpcomingMeetings(limit: number): Promise<PaginatedData<Meeting>> {
  return apiRequest<PaginatedData<Meeting>>("/meetings", {
    query: { upcomingOnly: 1, audience: "all", limit },
  });
}
