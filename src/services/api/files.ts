import { apiRequest } from "@/services/api/client";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { FileAsset } from "@/types/fileAsset";

export function getProcedureForms(
  params: PaginationParams = {},
): Promise<PaginatedData<FileAsset>> {
  return apiRequest<PaginatedData<FileAsset>>("/files", {
    query: { page: params.page, limit: params.limit, category: "form" },
  });
}
