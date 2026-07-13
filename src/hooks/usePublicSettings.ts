import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getPublicSettings } from "@/services/api/settings";

export function usePublicSettings() {
  return useQuery({
    queryKey: queryKeys.publicSettings,
    queryFn: getPublicSettings,
  });
}
