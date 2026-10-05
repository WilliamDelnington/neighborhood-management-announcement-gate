import { useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { LOAI_TIN_TUC, LOAI_TIN_TUC_LABEL, getNewsCategoryLabel } from "@/types/news";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { htmlExcerpt } from "@/utils/html";
import { resolveAssetUrl } from "@/utils/resolveAssetUrl";
import { useNews } from "./useNews";
import styles from "./NewsSection.module.css";

const CATEGORY_CHIPS = [
  { value: "", label: "Tất cả" },
  ...LOAI_TIN_TUC.map(value => ({ value, label: LOAI_TIN_TUC_LABEL[value] })),
];

export function NewsSection({ className }: { className?: string }) {
  const [category, setCategory] = useState("");
  const { data, isLoading, isError, isFetching } = useNews(category);
  const items = data?.items ?? [];

  return (
    <section id="tin-tuc" className={cn(styles.section, className)} aria-labelledby="tin-tuc-title">
      <SectionHeading id="tin-tuc-title" title="Tin tức" />
      <div role="group" aria-label="Lọc theo chuyên mục" className={styles.chips}>
        {CATEGORY_CHIPS.map(chip => (
          <button
            key={chip.value || "all"}
            type="button"
            className={cn(styles.chip, chip.value === category && styles.chipOn)}
            aria-pressed={chip.value === category}
            onClick={() => setCategory(chip.value)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && !data && (
        <ErrorState message="Không thể tải tin tức. Vui lòng thử lại sau." />
      )}
      {data && items.length === 0 && (
        <EmptyState
          message={category ? "Chưa có tin trong chuyên mục này." : "Chưa có tin tức nào được đăng."}
        />
      )}
      {items.length > 0 && (
        <ul className={cn(styles.list, isFetching && styles.stale)} aria-busy={isFetching}>
          {items.map((item, index) => {
            const cover = resolveAssetUrl(item.coverImageUrl || item.images?.[0]);
            const excerpt = htmlExcerpt(item.content);
            return (
              <li key={item._id}>
                <article className={cn(styles.card, index === 0 && styles.featured)}>
                  {cover && (
                    <img className={styles.cover} src={cover} alt="" loading="lazy" />
                  )}
                  <div className={styles.body}>
                    <span className={styles.meta}>
                      {getNewsCategoryLabel(item.category)} ·{" "}
                      {formatDate(item.publishedAt ?? item.createdAt)}
                    </span>
                    <h3 className={styles.title}>
                      <Link to={`/tin-tuc/${encodeURIComponent(item._id)}`}>{item.title}</Link>
                    </h3>
                    {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
