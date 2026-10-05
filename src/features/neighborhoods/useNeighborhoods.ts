import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { WARD_CODE } from "@/constants/env";
import { queryKeys } from "@/constants/queryKeys";
import { getPublicNeighborhoods } from "@/services/api/neighborhoods";

export function useNeighborhoods(q = "") {
  const query = q.trim();
  return useQuery({
    queryKey: queryKeys.neighborhoods({ q: query, wardCode: WARD_CODE ?? "" }),
    queryFn: () =>
      getPublicNeighborhoods({ q: query || undefined, wardCode: WARD_CODE }),
    placeholderData: keepPreviousData,
  });
}
