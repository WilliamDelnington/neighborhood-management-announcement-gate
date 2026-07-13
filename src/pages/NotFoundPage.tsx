import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="wrap" style={{ padding: "80px 24px", textAlign: "center" }}>
      <h2>Không tìm thấy trang</h2>
      <p>
        <Link to="/">Quay về trang chủ</Link>
      </p>
    </div>
  );
}
