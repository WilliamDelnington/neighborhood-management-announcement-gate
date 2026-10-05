import { apiRequest } from "@/services/api/client";
import type { PaginatedData } from "@/types/api";
import type { Survey } from "@/types/survey";

export function getOpenSurveys(limit: number): Promise<PaginatedData<Survey>> {
  return apiRequest<PaginatedData<Survey>>("/surveys", {
    query: { openOnly: 1, limit },
  });
}
