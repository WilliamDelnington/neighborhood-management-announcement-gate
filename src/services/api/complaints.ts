import { apiRequest } from "@/services/api/client";
import type { Complaint, CreateComplaintInput } from "@/types/complaint";

export function submitComplaint(input: CreateComplaintInput): Promise<Complaint> {
  return apiRequest<Complaint>("/complaints", {
    method: "POST",
    body: input,
    auth: true,
  });
}

export function lookupComplaint(code: string): Promise<Complaint> {
  return apiRequest<Complaint>("/complaints/lookup", {
    query: { code },
  });
}
