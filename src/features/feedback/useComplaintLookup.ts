import { useMutation } from "@tanstack/react-query";
import { lookupComplaint } from "@/services/api/complaints";

export function useComplaintLookup() {
  return useMutation({ mutationFn: lookupComplaint });
}
