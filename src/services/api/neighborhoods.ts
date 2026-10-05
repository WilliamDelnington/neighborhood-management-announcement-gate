import { apiRequest } from "@/services/api/client";
import type { PublicNeighborhoodsData } from "@/types/neighborhood";

export function getPublicNeighborhoods(
  params: { q?: string; wardCode?: string } = {},
): Promise<PublicNeighborhoodsData> {
  return apiRequest<PublicNeighborhoodsData>("/neighborhoods/public", {
    query: { q: params.q, wardCode: params.wardCode },
  });
}
