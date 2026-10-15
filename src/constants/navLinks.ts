export type NavLink = {
  to: string;
  label: string;
  // Lien ket toi mot route rieng (duoc danh dau trang hien tai) - cac lien ket
  // con lai la neo (#...) toi mot muc tren trang.
  route?: boolean;
};

export const navLinks: NavLink[] = [
  { to: "/", label: "Trang chủ", route: true },
  { to: "/#ban-do", label: "Bản đồ phường" },
  { to: "/to-dan-pho", label: "Tổ dân phố", route: true },
  { to: "/#tin-tuc", label: "Tin tức" },
  { to: "/#lich-hop", label: "Lịch họp" },
  { to: "#lien-he", label: "Liên hệ" },
];
