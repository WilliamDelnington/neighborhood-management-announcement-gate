import { apiRequest } from "@/services/api/client";
import type { PublicAppointmentServicesData } from "@/types/appointmentService";

export function getPublicAppointmentServices(
  params: { wardCode?: string } = {},
): Promise<PublicAppointmentServicesData> {
  return apiRequest<PublicAppointmentServicesData>("/appointment-services/public", {
    query: { wardCode: params.wardCode },
  });
}
