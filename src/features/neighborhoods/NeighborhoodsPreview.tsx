import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { Button, RouterLinkButton } from "@/components/ui/Button";
import { telHref } from "@/utils/formatPhone";
import { useNeighborhoods } from "./useNeighborhoods";
import { NeighborhoodHeadquarters } from "./NeighborhoodHeadquarters";
import styles from "./NeighborhoodsPreview.module.css";

const PREVIEW_COUNT = 3;

export function NeighborhoodsPreview() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useNeighborhoods();
  const neighborhoods = (data?.items ?? []).slice(0, PREVIEW_COUNT);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/to-dan-pho?q=${encodeURIComponent(q)}` : "/to-dan-pho");
  };

  return (
    <Section id="to-dan-pho" labelledBy="to-dan-pho-title">
      <SectionHeading
        id="to-dan-pho-title"
        title="Liên hệ Tổ dân phố"
        description="Số điện thoại hiển thị là số liên hệ chính thức của tổ, không phải số cá nhân."
        action={<Link to="/to-dan-pho">Xem danh bạ đầy đủ →</Link>}
      />
      <div className={styles.panel}>
        <form className={styles.form} role="search" onSubmit={onSubmit}>
          <label className={styles.label}>
            Tìm theo tên tổ, đường hoặc ngõ
            <input
              className={styles.input}
              type="search"
              name="q"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Ví dụ: Tổ dân phố số 3"
              autoComplete="off"
            />
          </label>
          <Button type="submit">
            Tìm Tổ dân phố
          </Button>
        </form>

        {isLoading && <LoadingSpinner />}
        {isError && (
          <ErrorState message="Không thể tải danh bạ Tổ dân phố. Vui lòng thử lại sau." />
        )}
        {data && neighborhoods.length === 0 && (
          <EmptyState message="Chưa có Tổ dân phố nào được công bố." />
        )}
        {neighborhoods.length > 0 && (
          <ul className={styles.list}>
            {neighborhoods.map(item => {
              const phone = item.contactPhone.trim();
              return (
                <li key={item._id} className={styles.item}>
                  <div className={styles.itemText}>
                    <strong className={styles.itemName}>{item.name}</strong>
                    <span className={styles.meta}>
                      Tổ trưởng: {item.leaderName || "Chưa cập nhật"}
                    </span>
                    <NeighborhoodHeadquarters neighborhood={item} />
                    {phone ? (
                      <a className={styles.phone} href={telHref(phone)}>
                        {phone}
                      </a>
                    ) : (
                      <span className={styles.meta}>Chưa công bố số liên hệ</span>
                    )}
                  </div>
                  {phone && (
                    <a
                      className={styles.callButton}
                      href={telHref(phone)}
                      aria-label={`Gọi ${item.name}: ${phone}`}
                    >
                      Gọi tổ
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <RouterLinkButton to="/to-dan-pho" variant="outline" className={styles.mobileMore}>
        Xem danh bạ đầy đủ
      </RouterLinkButton>
    </Section>
  );
}
