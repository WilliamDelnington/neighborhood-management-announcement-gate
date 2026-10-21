import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { NeighborhoodHeadquarters } from "@/features/neighborhoods/NeighborhoodHeadquarters";
import { useNeighborhoods } from "@/features/neighborhoods/useNeighborhoods";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import { neighborhoodGeometry } from "./neighborhoodGeometry";
import styles from "./WardMapSection.module.css";

const NeighborhoodBoundaryMap = lazy(() => import("./NeighborhoodBoundaryMap"));
const EMPTY_NEIGHBORHOODS: NonNullable<ReturnType<typeof useNeighborhoods>["data"]>["items"] = [];
function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

export function WardMapSection({ className }: { className?: string }) {
  const { ward, city } = useSiteIdentity();
  const { data, isLoading, isError, refetch } = useNeighborhoods();
  const neighborhoods = data?.items ?? EMPTY_NEIGHBORHOODS;
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return neighborhoods.filter(item => normalize([
      item.name, item.code, item.address, item.wardName, ...item.streets, ...item.alleyDescriptions,
    ].filter(Boolean).join(" ")).includes(search));
  }, [neighborhoods, query]);
  const mappedCount = useMemo(() => neighborhoods.filter(item => neighborhoodGeometry(item)).length, [neighborhoods]);
  const selected = neighborhoods.find(item => item._id === selectedId);
  const wardQuery = encodeURIComponent(`${ward}, ${city}, Việt Nam`);

  return (
    <section id="ban-do" className={cn(styles.card, className)} aria-labelledby="ban-do-title">
      <div className={styles.heading}>
        <div>
          <h2 id="ban-do-title" className={styles.title}>Bản đồ Tổ dân phố</h2>
          <p className={styles.description}>Tra cứu địa bàn, trụ sở và số liên hệ của các Tổ dân phố thuộc {ward}.</p>
        </div>
        <Link to="/to-dan-pho" className={styles.more}>Xem danh bạ đầy đủ →</Link>
      </div>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <label className={styles.searchLabel} htmlFor="map-neighborhood-search">Tìm Tổ dân phố, đường hoặc ngõ</label>
          <input id="map-neighborhood-search" type="search" className={styles.search} placeholder="Nhập tên tổ, địa chỉ, tuyến đường…" value={query} onChange={event => setQuery(event.target.value)} />
          {isLoading && <LoadingSpinner />}
          {isError && <>
            <ErrorState message="Không thể tải thông tin Tổ dân phố." />
            <button type="button" className={styles.retry} onClick={() => void refetch()}>Thử lại</button>
          </>}
          {data && <p className={styles.meta} role="status">{filtered.length} Tổ dân phố · {mappedCount} tổ có ranh giới trên bản đồ</p>}
          {data && !filtered.length && <EmptyState message={neighborhoods.length ? "Không tìm thấy Tổ dân phố phù hợp." : "Chưa có Tổ dân phố nào được công bố."} />}
          <ul className={styles.list} aria-label="Danh sách Tổ dân phố">
            {filtered.map(item => <li key={item._id}>
              <button type="button" className={cn(styles.option, item._id === selectedId && styles.selected)} aria-pressed={item._id === selectedId} onClick={() => setSelectedId(item._id)}>
                <strong>{item.name}</strong>
                <span>{item.address || "Chưa cập nhật địa chỉ trụ sở"}</span>
                <span className={styles.boundaryStatus}>{neighborhoodGeometry(item) ? "Xem ranh giới trên bản đồ" : "Chưa công bố ranh giới"}</span>
              </button>
            </li>)}
          </ul>
        </div>
        <div className={styles.frame}>
          {mappedCount > 0 ? <Suspense fallback={<LoadingSpinner />}>
            <NeighborhoodBoundaryMap neighborhoods={neighborhoods} selectedId={selectedId} onSelect={setSelectedId} />
          </Suspense> : <>
            <iframe className={styles.map} title={`Bản đồ tổng quan ${ward}`} src={`https://maps.google.com/maps?q=${wardQuery}&z=14&hl=vi&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <p className={styles.mapWarning}>{isError
              ? "Bản đồ tổng quan phường. Chưa tải được dữ liệu ranh giới Tổ dân phố; vui lòng thử lại."
              : isLoading
                ? "Đang tải thông tin và ranh giới Tổ dân phố…"
                : "Bản đồ tổng quan phường. Ranh giới Tổ dân phố sẽ hiển thị khi có dữ liệu được công bố."}</p>
          </>}
        </div>
      </div>
      <div className={styles.details} aria-live="polite">
        {selected ? <>
          <h3>{selected.name}</h3>
          <p>Tổ trưởng: {selected.leaderName || "Chưa cập nhật"}</p>
          <NeighborhoodHeadquarters neighborhood={selected} />
          {(selected.streets.length > 0 || selected.alleyDescriptions.length > 0) && <p><strong>Địa bàn: </strong>{[...selected.streets, ...selected.alleyDescriptions].join(", ")}</p>}
          {selected.description && <p>{selected.description}</p>}
          {selected.contactPhone ? <a className={styles.more} href={telHref(selected.contactPhone)}>Gọi số liên hệ của tổ: {selected.contactPhone}</a> : <p>Chưa công bố số liên hệ của tổ.</p>}
          {!neighborhoodGeometry(selected) && <p className={styles.meta}>Tổ này chưa có ranh giới được công bố trên bản đồ.</p>}
        </> : <p>Chọn một Tổ dân phố trong danh sách hoặc trên bản đồ để xem thông tin chi tiết.</p>}
      </div>
      <p className={styles.meta}>Thông tin Tổ dân phố lấy từ danh bạ do đơn vị quản lý cập nhật. Vùng tô màu hiển thị ranh giới đã lưu; nền bản đồ do dịch vụ bản đồ cung cấp.</p>
    </section>
  );
}
