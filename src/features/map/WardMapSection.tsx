import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState, ErrorState, LoadingSpinner } from "@/components/common/StatusStates";
import { NeighborhoodHeadquarters } from "@/features/neighborhoods/NeighborhoodHeadquarters";
import { useNeighborhoods } from "@/features/neighborhoods/useNeighborhoods";
import { useSiteIdentity } from "@/hooks/useSiteIdentity";
import { cn } from "@/utils/cn";
import { telHref } from "@/utils/formatPhone";
import { googleMapsDirectionsUrl } from "@/utils/googleMaps";
import { neighborhoodGeometry } from "./neighborhoodGeometry";
import { MapErrorBoundary } from "./MapErrorBoundary";
import { usePublicPois, type PublicPoi } from "./usePublicPois";
import { PoiCategoryIcon } from "./PoiCategoryIcon";
import { poiColorStyle } from "./poiAppearance";
import styles from "./WardMapSection.module.css";

const NeighborhoodBoundaryMap = lazy(() => import("./NeighborhoodBoundaryMap"));
const EMPTY_NEIGHBORHOODS: NonNullable<ReturnType<typeof useNeighborhoods>["data"]>["items"] = [];
const EMPTY_POIS: PublicPoi[] = [];
function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

export function WardMapSection({ className }: { className?: string }) {
  const { ward, city } = useSiteIdentity();
  const { data, isLoading, isError, refetch } = useNeighborhoods();
  const neighborhoods = data?.items ?? EMPTY_NEIGHBORHOODS;
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const typeQuery = usePublicPois([]);
  const poiQuery = usePublicPois(selectedTypes);
  const showPois = selectedTypes.length > 0;
  const pois = showPois ? poiQuery.data?.items ?? EMPTY_POIS : EMPTY_POIS;
  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return neighborhoods.filter(item => normalize([
      item.name, item.code, item.address, item.wardName, ...item.streets, ...item.alleyDescriptions,
    ].filter(Boolean).join(" ")).includes(search));
  }, [neighborhoods, query]);
  const filteredPois = useMemo(() => pois.filter(point => normalize(`${point.name} ${point.address}`).includes(normalize(query.trim()))), [pois, query]);
  const mappedCount = useMemo(() => neighborhoods.filter(item => neighborhoodGeometry(item)).length, [neighborhoods]);
  const selected = neighborhoods.find(item => item._id === selectedId);
  const selectedPoi = filteredPois.find(point => point.id === selectedPoiId);
  const wardQuery = encodeURIComponent(`${ward}, ${city}, Việt Nam`);
  const selectNeighborhood = useCallback((id: string) => { setSelectedId(id); setSelectedPoiId(null); }, []);
  const selectPoi = useCallback((id: string) => { setSelectedPoiId(id); setSelectedId(null); }, []);
  const toggleType = (key: string) => {
    setSelectedTypes(current => current.includes(key) ? current.filter(type => type !== key) : [...current, key]);
    setQuery("");
    setSelectedPoiId(null);
  };
  const fallback = <>
    <iframe className={styles.map} title={`Bản đồ tổng quan ${ward}`} src={`https://maps.google.com/maps?q=${wardQuery}&z=14&hl=vi&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    <div className={styles.mapWarning} role="status">
      Bản đồ tổng quan phường. Nếu lớp ranh giới hoặc điểm tiện ích không tải được, bạn vẫn có thể tra cứu trong danh sách.
      <button className={styles.reloadMap} type="button" onClick={() => window.location.reload()}>Tải lại bản đồ</button>
    </div>
  </>;

  return (
    <section id="ban-do" className={cn(styles.card, className)} aria-labelledby="ban-do-title">
      <div className={styles.heading}>
        <div>
          <h2 id="ban-do-title" className={styles.title}>Bản đồ Tổ dân phố & tiện ích</h2>
          <p className={styles.description}>Tra cứu Tổ dân phố và các địa điểm phục vụ đời sống tại {ward}.</p>
        </div>
        <Link to="/to-dan-pho" className={styles.more}>Xem danh bạ đầy đủ →</Link>
      </div>
      <div>
        <p id="poi-category-help" className={styles.meta}>Chọn loại địa điểm muốn hiển thị. Có thể chọn nhiều loại; vuốt ngang để xem thêm.</p>
        <div className={styles.categoryStrip} role="group" aria-label="Loại địa điểm trên bản đồ" aria-describedby="poi-category-help" tabIndex={0}>
          <button className={cn(styles.categoryChip, !showPois && styles.activeChip)} type="button" aria-pressed={!showPois} onClick={() => { setSelectedTypes([]); setQuery(""); setSelectedPoiId(null); }}>📍 Tổ dân phố</button>
          {typeQuery.data?.categories.map(type => <button key={type.key} type="button" style={poiColorStyle(type.key)} className={cn(styles.categoryChip, styles.poiCategoryChip, selectedTypes.includes(type.key) && styles.activeChip)} aria-pressed={selectedTypes.includes(type.key)} onClick={() => toggleType(type.key)}><PoiCategoryIcon category={type.key} /> {type.label}</button>)}
        </div>
        {typeQuery.isLoading && <p className={styles.meta} role="status">Đang tải loại địa điểm…</p>}
        {typeQuery.isError && <p className={styles.meta} role="status">Chưa tải được loại địa điểm. <button className={styles.inlineButton} type="button" onClick={() => void typeQuery.refetch()}>Thử lại</button></p>}
      </div>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <label className={styles.searchLabel} htmlFor="map-neighborhood-search">{showPois ? "Tìm địa điểm trong loại đã chọn" : "Tìm Tổ dân phố, đường hoặc ngõ"}</label>
          <input id="map-neighborhood-search" type="search" className={styles.search} placeholder={showPois ? "Nhập tên hoặc địa chỉ địa điểm…" : "Nhập tên tổ, địa chỉ, tuyến đường…"} value={query} onChange={event => setQuery(event.target.value)} />
          {(showPois ? poiQuery.isLoading : isLoading) && <LoadingSpinner />}
          {(showPois ? poiQuery.isError : isError) && <>
            <ErrorState message={showPois ? "Không thể tải địa điểm tiện ích." : "Không thể tải thông tin Tổ dân phố."} />
            <button type="button" className={styles.retry} onClick={() => void (showPois ? poiQuery.refetch() : refetch())}>Thử lại</button>
          </>}
          {showPois ? <>
            {poiQuery.data && <p className={styles.meta} role="status">{filteredPois.length} địa điểm đã xác minh{poiQuery.data.truncated ? " · Thu hẹp loại địa điểm để xem thêm kết quả" : ""}</p>}
            {poiQuery.data && !filteredPois.length && <EmptyState message={query ? "Không tìm thấy địa điểm phù hợp." : "Chưa có địa điểm đã xác minh thuộc loại đã chọn trong phường."} />}
            <ul className={styles.list} aria-label="Địa điểm tiện ích">
              {filteredPois.map(point => <li key={point.id}>
                <button type="button" className={cn(styles.option, point.id === selectedPoiId && styles.selected)} aria-pressed={point.id === selectedPoiId} onClick={() => selectPoi(point.id)}>
                  <span className={styles.poiHeading}><span className={styles.poiBadge} style={poiColorStyle(point.category)}><PoiCategoryIcon category={point.category} /></span><strong>{point.name}</strong></span>
                  <span>{point.address || "Chưa cập nhật địa chỉ"}</span>
                  <span className={styles.boundaryStatus}>{typeQuery.data?.categories.find(type => type.key === point.category)?.label}</span>
                </button>
                <a className={styles.poiDirections} href={googleMapsDirectionsUrl(point.lat, point.lng)} target="_blank" rel="noopener noreferrer" aria-label={`Chỉ đường đến ${point.name} trên Google Maps`}>Chỉ đường trên Google Maps →</a>
              </li>)}
            </ul>
          </> : <>
            {data && <p className={styles.meta} role="status">{filtered.length} Tổ dân phố · {mappedCount} tổ có ranh giới trên bản đồ</p>}
            {data && !filtered.length && <EmptyState message={neighborhoods.length ? "Không tìm thấy Tổ dân phố phù hợp." : "Chưa có Tổ dân phố nào được công bố."} />}
            <ul className={styles.list} aria-label="Danh sách Tổ dân phố">
              {filtered.map(item => <li key={item._id}><button type="button" className={cn(styles.option, item._id === selectedId && styles.selected)} aria-pressed={item._id === selectedId} onClick={() => selectNeighborhood(item._id)}><strong>{item.name}</strong><span>{item.address || "Chưa cập nhật địa chỉ trụ sở"}</span><span className={styles.boundaryStatus}>{neighborhoodGeometry(item) ? "Xem ranh giới trên bản đồ" : "Chưa công bố ranh giới"}</span></button></li>)}
            </ul>
          </>}
        </div>
        <div className={styles.frame}>
          {mappedCount > 0 || filteredPois.length > 0 ? <MapErrorBoundary fallback={fallback}><Suspense fallback={<LoadingSpinner />}>
            <NeighborhoodBoundaryMap neighborhoods={neighborhoods} selectedId={selectedId} onSelect={selectNeighborhood} pois={filteredPois} selectedPoiId={selectedPoiId} onSelectPoi={selectPoi} fallback={fallback} />
          </Suspense></MapErrorBoundary> : fallback}
        </div>
      </div>
      <div className={styles.details} aria-live="polite">
        {selectedPoi ? <>
          <h3 className={styles.poiHeading}><span className={styles.poiBadge} style={poiColorStyle(selectedPoi.category)}><PoiCategoryIcon category={selectedPoi.category} /></span>{selectedPoi.name}</h3>
          <p>{selectedPoi.address || "Chưa cập nhật địa chỉ"}</p>
          <p className={styles.meta}>Địa điểm đã được xác minh trong danh mục tiện ích.</p>
          <a className={styles.more} href={googleMapsDirectionsUrl(selectedPoi.lat, selectedPoi.lng)} target="_blank" rel="noopener noreferrer">Chỉ đường đến địa điểm →</a>
        </> : selected ? <>
          <h3>{selected.name}</h3>
          <p>Tổ trưởng: {selected.leaderName || "Chưa cập nhật"}</p>
          <NeighborhoodHeadquarters neighborhood={selected} />
          {(selected.streets.length > 0 || selected.alleyDescriptions.length > 0) && <p><strong>Địa bàn: </strong>{[...selected.streets, ...selected.alleyDescriptions].join(", ")}</p>}
          {selected.description && <p>{selected.description}</p>}
          {selected.contactPhone ? <a className={styles.more} href={telHref(selected.contactPhone)}>Gọi số liên hệ của tổ: {selected.contactPhone}</a> : <p>Chưa công bố số liên hệ của tổ.</p>}
          {!neighborhoodGeometry(selected) && <p className={styles.meta}>Tổ này chưa có ranh giới được công bố trên bản đồ.</p>}
        </> : <p>Chọn một Tổ dân phố hoặc địa điểm trong danh sách hay trên bản đồ để xem chi tiết và chỉ đường.</p>}
      </div>
      <p className={styles.meta}>Ranh giới và địa điểm do đơn vị quản lý cập nhật. Chỉ hiển thị loại địa điểm có tiện ích đã xác minh trong phường. Màu và biểu tượng của địa điểm khớp với loại đã chọn ở trên; vùng màu xanh là Tổ dân phố.</p>
    </section>
  );
}
