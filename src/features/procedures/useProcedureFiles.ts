import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getProcedureForms } from "@/services/api/files";

export function useProcedureFiles() {
  return useQuery({
    queryKey: queryKeys.procedureForms,
    queryFn: () => getProcedureForms({ limit: 20 }),
  });
}
