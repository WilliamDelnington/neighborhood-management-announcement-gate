export const LOAI_THONG_BAO = [
  "chung",
  "hop_dan",
  "pccc",
  "ve_sinh_moi_truong",
  "an_ninh_trat_tu",
  "khac",
] as const;
export type LoaiThongBao = (typeof LOAI_THONG_BAO)[number];

export const LOAI_THONG_BAO_LABEL: Record<LoaiThongBao, string> = {
  chung: "Thông báo chung",
  hop_dan: "Họp dân",
  pccc: "PCCC",
  ve_sinh_moi_truong: "Vệ sinh môi trường",
  an_ninh_trat_tu: "An ninh trật tự",
  khac: "Khác",
};

export type Announcement = {
  _id: string;
  title: string;
  content: string;
  category: LoaiThongBao;
  status: "nhap" | "da_dang";
  priority: boolean;
  pinned: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementBadgeVariant = "khan" | "thuong" | "sukien";

export function getAnnouncementBadgeVariant(
  announcement: Pick<Announcement, "priority" | "pinned">,
): AnnouncementBadgeVariant {
  if (announcement.priority) return "khan";
  if (announcement.pinned) return "sukien";
  return "thuong";
}
