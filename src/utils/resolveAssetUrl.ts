// Anh tai len (logo, banner, anh bia tin tuc, icon ung dung...) duoc backend
// tra ve duoi dang duong dan TUONG DOI (vd /uploads/settings/x.png) va phuc vu
// tu chinh host cua backend - khong phai host cua trang nay. Goc backend lay
// tu VITE_API_BASE_URL sau khi bo hau to /api.
const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? "")
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

// http:, https:, data:, blob:, mailto: ... hoac //host/...
const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

export function resolveAssetUrl(url: string | null | undefined): string | undefined {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;
  if (ABSOLUTE_URL.test(trimmed)) return trimmed;
  return `${API_ORIGIN}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}
