import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function MainLayout() {
  return (
    <>
      <a href="#noi-dung" className="skip-link">
        Bỏ qua để xem nội dung chính
      </a>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
