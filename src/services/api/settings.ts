import { apiRequest } from "@/services/api/client";
import type { PublicSettings } from "@/types/settings";

export function getPublicSettings(): Promise<PublicSettings> {
  return apiRequest<PublicSettings>("/settings");
}
