import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useRegister } from "./useAuth";
import styles from "./AuthForm.module.css";

export function RegisterForm() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useRegister();
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutate(
      { displayName, phone, password },
      { onSuccess: () => navigate("/") },
    );
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Đăng ký</h2>
      <p className={styles.subtitle}>Tạo tài khoản để gửi phản ánh, kiến nghị tới Ban công tác.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          id="displayName"
          label="Họ và tên"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
        />
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
          minLength={6}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
        {isError && <p className={styles.error}>{error.message}</p>}
      </form>
      <p className={styles.footNote}>
        Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
      </p>
    </div>
  );
}
