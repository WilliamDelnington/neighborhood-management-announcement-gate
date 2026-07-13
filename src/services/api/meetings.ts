import { apiRequest } from "@/services/api/client";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { Meeting } from "@/types/meeting";

export function getUpcomingMeetings(
  params: PaginationParams = {},
): Promise<PaginatedData<Meeting>> {
  return apiRequest<PaginatedData<Meeting>>("/meetings", {
    query: { page: params.page, limit: params.limit, upcomingOnly: 1 },
  });
}
