export const queryKeys = {
  announcements: (params: { limit: number; audience: string }) =>
    ["announcements", params] as const,
  publicSettings: ["public-settings"] as const,
  utilityApps: ["utility-apps"] as const,
  news: (params: { limit: number; category: string }) => ["news", params] as const,
  newsDetail: (id: string) => ["news", "detail", id] as const,
  upcomingMeetings: (params: { limit: number }) =>
    ["meetings", "upcoming", params] as const,
  openSurveys: ["surveys", "open"] as const,
  appointmentServices: (wardCode: string) =>
    ["appointment-services", "public", wardCode] as const,
  neighborhoods: (params: { q: string; wardCode: string }) =>
    ["neighborhoods", "public", params] as const,
};
