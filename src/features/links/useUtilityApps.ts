import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getUtilityApps } from "@/services/api/utilityApps";

export function useUtilityApps() {
  return useQuery({
    queryKey: queryKeys.utilityApps,
    queryFn: getUtilityApps,
  });
}
