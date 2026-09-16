export const queryKeys = {
  announcements: ["announcements"] as const,
  publicSettings: ["public-settings"] as const,
  utilityApps: ["utility-apps"] as const,
  complaintLookup: (code: string) => ["complaint-lookup", code] as const,
};
