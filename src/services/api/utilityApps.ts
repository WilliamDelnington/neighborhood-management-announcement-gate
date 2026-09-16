import { apiRequest } from "@/services/api/client";
import type { PaginatedData } from "@/types/api";
import type { UtilityApp } from "@/types/utilityApp";

export function getUtilityApps(): Promise<PaginatedData<UtilityApp>> {
  return apiRequest<PaginatedData<UtilityApp>>("/utility-apps", {
    query: { limit: 50 },
  });
}
