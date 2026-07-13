import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import { useAuthStore } from "@/store/authStore";
import { NHOM_PHAN_ANH, NHOM_PHAN_ANH_LABEL, type NhomPhanAnh } from "@/types/complaint";
import { useSubmitComplaint } from "./useSubmitComplaint";
import styles from "./ComplaintForm.module.css";

const categoryOptions = NHOM_PHAN_ANH.map(value => ({
  value,
  label: NHOM_PHAN_ANH_LABEL[value],
}));

export function ComplaintForm() {
  const user = useAuthStore(state => state.user);
  const { mutate, isPending, isSuccess, isError, data, error, reset } = useSubmitComplaint();

  const [category, setCategory] = useState<NhomPhanAnh>(NHOM_PHAN_ANH[0]);
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [content, setContent] = useState("");

  if (!user) {
    return (
      <p className={styles.authPrompt}>
        Vui lòng <Link to="/dang-nhap">đăng nhập</Link> để gửi phản ánh, kiến nghị.
        Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link>.
      </p>
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    reset();
    mutate(
      { category, title, content, area: area || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setArea("");
          setContent("");
        },
      },
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Select
        id="loai"
        label="Loại phản ánh"
        options={categoryOptions}
        value={category}
        onChange={e => setCategory(e.target.value as NhomPhanAnh)}
      />
      <TextField
        id="tieude"
        label="Tiêu đề"
        placeholder="Tóm tắt ngắn gọn nội dung phản ánh"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <TextField
        id="khuvuc"
        label="Khu vực / số nhà (tuỳ chọn)"
        placeholder="Số nhà, ngõ, đường"
        value={area}
        onChange={e => setArea(e.target.value)}
      />
      <TextArea
        id="noidung"
        label="Nội dung"
        placeholder="Mô tả nội dung phản ánh"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Đang gửi..." : "Gửi phản ánh"}
      </Button>
      {isSuccess && data && (
        <p className={styles.submitMsg}>
          Đã ghi nhận phản ánh, mã tra cứu: <strong className="mono">{data.code}</strong>.
          Ban công tác sẽ liên hệ lại trong thời gian sớm nhất.
        </p>
      )}
      {isError && <p className={styles.errorMsg}>{error.message}</p>}
    </form>
  );
}
