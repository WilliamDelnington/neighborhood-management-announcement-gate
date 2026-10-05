import { usePublicSettings } from "@/hooks/usePublicSettings";
import { resolveAssetUrl } from "@/utils/resolveAssetUrl";

// Ten mac dinh khi cau hinh app_identity chua co / dang tai - la ten that cua
// don vi van hanh trang nay (truoc day duoc viet cung trong Header/Footer).
const DEFAULT_WARD = "Phường Dương Nội";
const DEFAULT_CITY = "Thành phố Hà Nội";

export function useSiteIdentity() {
  const { data } = usePublicSettings();
  const identity = data?.app_identity;
  const ward = identity?.ward?.trim() || DEFAULT_WARD;
  const city = identity?.city?.trim() || DEFAULT_CITY;

  return {
    identity,
    ward,
    city,
    unitName: identity?.name?.trim() || `UBND ${ward}`,
    // "Phường Dương Nội" -> "phường Dương Nội" de ghep vao giua cau.
    wardInSentence: ward.replace(/^(Phường|Xã|Thị trấn)(?=\s)/u, m => m.toLowerCase()),
    logoUrl: resolveAssetUrl(data?.announcement_gate_logo_url),
    billboardUrl: resolveAssetUrl(data?.announcement_gate_billboard_url),
  };
}
