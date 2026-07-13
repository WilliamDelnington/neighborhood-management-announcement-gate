import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useLogin } from "./useAuth";
import styles from "./AuthForm.module.css";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLogin();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutate(
      { phone, password },
      { onSuccess: () => navigate("/") },
    );
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Đăng nhập</h2>
      <p className={styles.subtitle}>Đăng nhập để gửi phản ánh, kiến nghị tới Ban công tác.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          id="phone"
          label="Số điện thoại"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        {isError && <p className={styles.error}>{error.message}</p>}
      </form>
      <p className={styles.footNote}>
        Chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link>
      </p>
    </div>
  );
}
