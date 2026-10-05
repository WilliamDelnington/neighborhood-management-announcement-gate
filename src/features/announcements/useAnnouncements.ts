import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getAnnouncements } from "@/services/api/announcements";

// Chi thong bao gui toi TOAN BO cu dan (audience=all) - trang cong khai khong
// biet nguoi xem thuoc to/nhom nao.
export function useAnnouncements(limit = 5) {
  return useQuery({
    queryKey: queryKeys.announcements({ limit, audience: "all" }),
    queryFn: () => getAnnouncements({ page: 1, limit, audience: "all" }),
  });
}
