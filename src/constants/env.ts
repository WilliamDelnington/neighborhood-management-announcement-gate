function readOptional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

// Ma phuong/xa (tuy chon) - khi dat, chi lay Tổ dân phố
// cua phuong nay tu cac endpoint cong khai.
export const WARD_CODE = readOptional(import.meta.env.VITE_WARD_CODE);

// Dia chi ung dung cu dan (tuy chon) - dung cho cac nut "tham gia khao sat
// tren ung dung cu dan". Khi khong dat thi chi hien chu, khong co lien ket.
export const RESIDENT_APP_URL = readOptional(import.meta.env.VITE_RESIDENT_APP_URL);

// Ung dung quan tri danh cho nguoi dung duoc uy quyen.
export const ADMIN_APP_URL = readOptional(import.meta.env.VITE_ADMIN_APP_URL);

export function authorizedLoginHref(): string | undefined {
  return ADMIN_APP_URL ? `${ADMIN_APP_URL.replace(/\/+$/, "")}/login` : undefined;
}

// Duong dan toi 1 trang cua ung dung cu dan (resident-web-app). Cac trang can
// dang nhap (khao sat, gui phan anh) tu chuyen ve /login cua app do
// roi quay lai dung trang nay sau khi dang nhap - cong thong tin KHONG tu nhan
// mat khau. Tra undefined khi chua cau hinh VITE_RESIDENT_APP_URL.
export function residentAppHref(path = "/"): string | undefined {
  if (!RESIDENT_APP_URL) return undefined;
  const base = RESIDENT_APP_URL.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
