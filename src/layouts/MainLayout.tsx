import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// react-router khong tu cuon toi #neo khi dieu huong client-side (vd tu
// /dich-vu bam "Tin tức" -> /#tin-tuc). Muc dich co the chua render ngay (dang
// tai du lieu) nen thu lai vai lan. Chi cuon len dau trang khi doi trang -
// doi query string (vd ô tìm kiếm ?q=) khong cuon.
function useScrollOnNavigate() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (!hash) {
      if (pathChanged) window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer: number | undefined;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
      if (attempts++ < 15) timer = window.setTimeout(tryScroll, 100);
    };
    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);
}

export function MainLayout() {
  useScrollOnNavigate();

  return (
    <>
      <a href="#noi-dung" className="skip-link">
        Bỏ qua để xem nội dung chính
      </a>
      <Header />
      <main id="noi-dung" tabIndex={-1} style={{ outline: "none" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
