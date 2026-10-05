import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { NeighborhoodCard } from "@/features/neighborhoods/NeighborhoodCard";
import { useNeighborhoods } from "@/features/neighborhoods/useNeighborhoods";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import styles from "./NeighborhoodsPage.module.css";

const SEARCH_DEBOUNCE_MS = 300;

export function NeighborhoodsPage() {
  useDocumentTitle("Danh bạ Tổ dân phố");
  const { identity } = useSiteIdentity();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [input, setInput] = useState(urlQuery);
  const debouncedInput = useDebouncedValue(input.trim(), SEARCH_DEBOUNCE_MS);

  // O tim kiem -> ?q= (thay the lich su, khong tao muc moi moi lan go).
  useEffect(() => {
    if (debouncedInput === urlQuery) return;
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);
        if (debouncedInput) next.set("q", debouncedInput);
        else next.delete("q");
        return next;
      },
      { replace: true },
    );
    // Chi phan ung khi gia tri go (da debounce) thay doi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  // ?q= doi tu ben ngoai (Back/Forward, lien ket "Tổ dân phố" tren menu) -> o tim kiem.
  useEffect(() => {
    setInput(current => (current.trim() === urlQuery ? current : urlQuery));
  }, [urlQuery]);

  const { data, isLoading, isError, isFetching } = useNeighborhoods(urlQuery);
  const items = data?.items ?? [];
  const wardPhone = identity?.phone?.trim();

  return (
    <div className={cn("wrap", styles.page)}>
      <PageHeader
        title="Danh bạ Tổ dân phố"
        crumb="Tổ dân phố"
        description="Tìm tổ của bạn theo tên tổ, đường hoặc ngõ. Số điện thoại là số liên hệ chính thức của tổ do phường công bố – không hiển thị số điện thoại cá nhân của tổ trưởng."
      />

      <form className={styles.searchCard} role="search" onSubmit={event => event.preventDefault()}>
        <label className={styles.label}>
          Tìm Tổ dân phố
          <input
            className={styles.input}
            type="search"
            name="q"
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="Tên tổ, tên đường hoặc ngõ"
            autoComplete="off"
          />
        </label>
        <span className={styles.count} role="status" aria-live="polite">
          {data && (urlQuery ? `Tìm thấy ${items.length} tổ dân phố` : `${items.length} tổ dân phố`)}
        </span>
      </form>

      {isLoading && <LoadingSpinner />}
      {isError && !data && (
        <ErrorState message="Không thể tải danh bạ Tổ dân phố. Vui lòng thử lại sau." />
      )}

      {data && items.length === 0 && (
        <div className={styles.empty}>
          <strong>
            {urlQuery ? "Không tìm thấy Tổ dân phố phù hợp" : "Chưa có Tổ dân phố nào được công bố"}
          </strong>
          {urlQuery && (
            <span className={styles.meta}>
              Thử tên đường hoặc số tổ khác
              {wardPhone ? (
                <>
                  , hoặc gọi tổng đài phường: <a href={telHref(wardPhone)}>{wardPhone}</a>.
                </>
              ) : (
                "."
              )}
            </span>
          )}
        </div>
      )}

      {items.length > 0 && (
        <ul className={cn(styles.grid, isFetching && styles.stale)} aria-busy={isFetching}>
          {items.map(item => (
            <li key={item._id}>
              <NeighborhoodCard neighborhood={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
