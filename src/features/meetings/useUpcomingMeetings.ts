import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getUpcomingMeetings } from "@/services/api/meetings";

export function useUpcomingMeetings(limit = 3) {
  return useQuery({
    queryKey: queryKeys.upcomingMeetings({ limit }),
    queryFn: () => getUpcomingMeetings(limit),
  });
}
