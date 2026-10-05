import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getOpenSurveys } from "@/services/api/surveys";

// Chi lay 1 khao sat dang mo de hien thi gon - viec tra loi can dang nhap nen
// thuc hien tren ung dung cu dan, khong co form o day.
export function useOpenSurvey() {
  return useQuery({
    queryKey: queryKeys.openSurveys,
    queryFn: () => getOpenSurveys(1),
    select: data => data.items[0] ?? null,
  });
}
