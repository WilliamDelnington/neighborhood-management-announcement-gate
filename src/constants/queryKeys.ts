export const queryKeys = {
  announcements: ["announcements"] as const,
  meetings: ["meetings"] as const,
  procedureForms: ["procedure-forms"] as const,
  publicSettings: ["public-settings"] as const,
  complaintLookup: (code: string) => ["complaint-lookup", code] as const,
};
