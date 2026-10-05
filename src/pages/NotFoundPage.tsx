import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Không tìm thấy trang");

  return (
    <div className="wrap" style={{ padding: "80px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 26 }}>Không tìm thấy trang</h1>
      <p style={{ marginTop: 12 }}>
        <Link to="/">Quay về trang chủ</Link>
      </p>
    </div>
  );
}
