import { apiRequest } from "@/services/api/client";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { Announcement } from "@/types/announcement";

export function getAnnouncements(
  params: PaginationParams = {},
): Promise<PaginatedData<Announcement>> {
  return apiRequest<PaginatedData<Announcement>>("/announcements", {
    query: { page: params.page, limit: params.limit },
  });
}
