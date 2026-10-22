import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/services/api/client";

export type PublicPoiType = { key: string; label: string; symbol: string };
export type PublicPoi = { id: string; name: string; category: string; address: string; lat: number; lng: number };
type PublicPoisData = { categories: PublicPoiType[]; items: PublicPoi[]; truncated: boolean };

export function usePublicPois(categories: string[]) {
  const selection = [...categories].sort().join(",");
  return useQuery({
    queryKey: ["public-pois", selection],
    queryFn: () => apiRequest<PublicPoisData>("/pois/public", { query: { categories: selection } }),
    staleTime: 60_000,
  });
}
