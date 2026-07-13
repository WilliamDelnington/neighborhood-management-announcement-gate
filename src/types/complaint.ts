export const NHOM_PHAN_ANH = [
  "an_ninh_trat_tu",
  "pccc",
  "ve_sinh_moi_truong",
  "ha_tang_dien_nuoc",
  "chieu_sang",
  "tranh_chap_dan_cu",
  "tam_tru_nha_cho_thue",
  "gop_y_chung",
  "khac",
] as const;
export type NhomPhanAnh = (typeof NHOM_PHAN_ANH)[number];

export const NHOM_PHAN_ANH_LABEL: Record<NhomPhanAnh, string> = {
  an_ninh_trat_tu: "An ninh trật tự",
  pccc: "PCCC",
  ve_sinh_moi_truong: "Vệ sinh môi trường",
  ha_tang_dien_nuoc: "Hạ tầng điện nước",
  chieu_sang: "Chiếu sáng",
  tranh_chap_dan_cu: "Tranh chấp dân cư",
  tam_tru_nha_cho_thue: "Tạm trú / nhà cho thuê",
  gop_y_chung: "Góp ý chung",
  khac: "Khác",
};

export const TRANG_THAI_PHAN_ANH = [
  "moi_tiep_nhan",
  "da_tiep_nhan",
  "dang_xu_ly",
  "da_chuyen_ubnd",
  "da_xu_ly",
  "dong",
] as const;
export type TrangThaiPhanAnh = (typeof TRANG_THAI_PHAN_ANH)[number];

export const TRANG_THAI_PHAN_ANH_LABEL: Record<TrangThaiPhanAnh, string> = {
  moi_tiep_nhan: "Mới tiếp nhận",
  da_tiep_nhan: "Đã tiếp nhận",
  dang_xu_ly: "Đang xử lý",
  da_chuyen_ubnd: "Đã chuyển UBND phường",
  da_xu_ly: "Đã xử lý",
  dong: "Đóng",
};

export type Complaint = {
  _id: string;
  code: string;
  category: NhomPhanAnh;
  title: string;
  content: string;
  area?: string;
  status: TrangThaiPhanAnh;
  createdAt: string;
  updatedAt: string;
};

export type CreateComplaintInput = {
  category: NhomPhanAnh;
  title: string;
  content: string;
  area?: string;
};
