import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { useNewsDetail } from "@/features/news/useNews";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ApiError } from "@/services/api/client";
import { getNewsCategoryLabel } from "@/types/news";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";
import { resolveAssetUrl } from "@/utils/resolveAssetUrl";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import styles from "./NewsDetailPage.module.css";

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: news, isLoading, isError, error } = useNewsDetail(id);
  useDocumentTitle(news?.title ?? "Tin tức");

  const html = useMemo(() => (news ? sanitizeHtml(news.content) : ""), [news]);
  const cover = resolveAssetUrl(news?.coverImageUrl);
  const gallery = (news?.images ?? [])
    .map(resolveAssetUrl)
    .filter((url): url is string => !!url && url !== cover);
  const notFound = isError && error instanceof ApiError && error.status === 404;

  return (
    <div className={cn("wrap", styles.page)}>
      <nav aria-label="Vị trí trang" className={styles.crumbs}>
        <ol>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/#tin-tuc">Tin tức</Link>
          </li>
          {news && <li aria-current="page">{news.title}</li>}
        </ol>
      </nav>

      {isLoading && <LoadingSpinner />}
      {notFound && (
        <div className={styles.missing}>
          <h1 className={styles.missingTitle}>Không tìm thấy tin tức</h1>
          <p>Tin này không tồn tại hoặc đã được gỡ xuống.</p>
          <Link to="/#tin-tuc">Xem các tin khác</Link>
        </div>
      )}
      {isError && !notFound && (
        <ErrorState message="Không thể tải tin tức. Vui lòng thử lại sau." />
      )}

      {news && (
        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.meta}>
              {getNewsCategoryLabel(news.category)} ·{" "}
              <time dateTime={news.publishedAt ?? news.createdAt}>
                {formatDate(news.publishedAt ?? news.createdAt)}
              </time>
            </span>
            <h1 className={styles.title}>{news.title}</h1>
          </header>
          {cover && <img className={styles.cover} src={cover} alt="" />}
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
          {gallery.length > 0 && (
            <ul className={styles.gallery} aria-label="Hình ảnh">
              {gallery.map(url => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="" loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Link to="/#tin-tuc" className={styles.back}>
            ← Quay lại danh sách tin
          </Link>
        </article>
      )}
    </div>
  );
}
