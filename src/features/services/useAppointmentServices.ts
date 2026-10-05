import { useQuery } from "@tanstack/react-query";
import { WARD_CODE } from "@/constants/env";
import { queryKeys } from "@/constants/queryKeys";
import { getPublicAppointmentServices } from "@/services/api/appointmentServices";

export function useAppointmentServices() {
  return useQuery({
    queryKey: queryKeys.appointmentServices(WARD_CODE ?? ""),
    queryFn: () => getPublicAppointmentServices({ wardCode: WARD_CODE }),
  });
}
