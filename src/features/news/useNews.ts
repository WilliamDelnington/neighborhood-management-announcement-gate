import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiError } from "@/services/api/client";
import { getNews, getNewsById } from "@/services/api/news";

export function useNews(category: string, limit = 6) {
  return useQuery({
    queryKey: queryKeys.news({ limit, category }),
    queryFn: () => getNews({ page: 1, limit, category: category || undefined }),
    placeholderData: keepPreviousData,
  });
}

export function useNewsDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.newsDetail(id ?? ""),
    queryFn: () => getNewsById(id as string),
    enabled: !!id,
    // 404 = tin khong ton tai / chua dang - thu lai cung vo ich.
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 1,
  });
}
