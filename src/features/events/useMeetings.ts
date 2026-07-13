import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getUpcomingMeetings } from "@/services/api/meetings";

export function useMeetings() {
  return useQuery({
    queryKey: queryKeys.meetings,
    queryFn: () => getUpcomingMeetings({ limit: 6 }),
  });
}
