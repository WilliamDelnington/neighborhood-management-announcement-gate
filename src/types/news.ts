export const LOAI_TIN_TUC = [
  "chung",
  "hoat_dong",
  "an_ninh_trat_tu",
  "khac",
] as const;
export type LoaiTinTuc = (typeof LOAI_TIN_TUC)[number];

// Dong bo voi LOAI_TIN_TUC_LABEL o backend (src/types/index.ts).
export const LOAI_TIN_TUC_LABEL: Record<LoaiTinTuc, string> = {
  chung: "Tin chung",
  hoat_dong: "Hoạt động cộng đồng",
  an_ninh_trat_tu: "An ninh trật tự",
  khac: "Khác",
};

export function getNewsCategoryLabel(category: string): string {
  return LOAI_TIN_TUC_LABEL[category as LoaiTinTuc] ?? "Tin tức";
}

export type NewsItem = {
  _id: string;
  title: string;
  category: LoaiTinTuc;
  // HTML da qua trinh soan thao - phai sanitize truoc khi render.
  content: string;
  coverImageUrl?: string;
  images?: string[];
  pinned: boolean;
  publishedAt?: string;
  createdAt: string;
};
