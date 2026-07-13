import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getAnnouncements } from "@/services/api/announcements";

export function useAnnouncements() {
  return useQuery({
    queryKey: queryKeys.announcements,
    queryFn: () => getAnnouncements({ limit: 8 }),
  });
}
