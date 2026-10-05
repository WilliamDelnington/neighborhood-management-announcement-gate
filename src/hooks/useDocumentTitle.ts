import { useEffect } from "react";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";

// Tieu de tab: "<trang> – <Phuong> - Cong thong tin dien tu".
export function useDocumentTitle(page?: string) {
  const { ward } = useSiteIdentity();
  useEffect(() => {
    const base = `${ward} - Cổng thông tin điện tử`;
    document.title = page ? `${page} – ${base}` : base;
  }, [page, ward]);
}
