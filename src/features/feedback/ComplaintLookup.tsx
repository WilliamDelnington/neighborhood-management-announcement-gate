import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { NHOM_PHAN_ANH_LABEL, TRANG_THAI_PHAN_ANH_LABEL } from "@/types/complaint";
import { useComplaintLookup } from "./useComplaintLookup";
import styles from "./ComplaintLookup.module.css";

export function ComplaintLookup() {
  const [code, setCode] = useState("");
  const { mutate, data, isPending, isError, error } = useComplaintLookup();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (code.trim()) mutate(code.trim());
  }

  return (
    <div className={styles.box}>
      <form className={styles.row} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập mã phản ánh, vd: HB-PA-2026-0001"
          value={code}
          onChange={e => setCode(e.target.value)}
          aria-label="Mã phản ánh"
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          Tra cứu
        </Button>
      </form>
      {isError && <p className={styles.error}>{error.message}</p>}
      {data && (
        <dl className={styles.result}>
          <dt>Tiêu đề</dt>
          <dd>{data.title}</dd>
          <dt>Loại phản ánh</dt>
          <dd>{NHOM_PHAN_ANH_LABEL[data.category]}</dd>
          <dt>Trạng thái</dt>
          <dd>{TRANG_THAI_PHAN_ANH_LABEL[data.status]}</dd>
        </dl>
      )}
    </div>
  );
}
