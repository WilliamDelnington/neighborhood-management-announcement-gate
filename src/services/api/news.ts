import { apiRequest } from "@/services/api/client";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { NewsItem } from "@/types/news";

export function getNews(
  params: PaginationParams & { category?: string } = {},
): Promise<PaginatedData<NewsItem>> {
  return apiRequest<PaginatedData<NewsItem>>("/news", {
    query: { page: params.page, limit: params.limit, category: params.category },
  });
}

export function getNewsById(id: string): Promise<NewsItem> {
  return apiRequest<NewsItem>(`/news/${encodeURIComponent(id)}`);
}
