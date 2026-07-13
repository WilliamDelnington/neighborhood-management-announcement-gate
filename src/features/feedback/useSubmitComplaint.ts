import { useMutation } from "@tanstack/react-query";
import { submitComplaint } from "@/services/api/complaints";

export function useSubmitComplaint() {
  return useMutation({ mutationFn: submitComplaint });
}
