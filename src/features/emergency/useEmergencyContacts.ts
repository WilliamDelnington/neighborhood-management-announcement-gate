import { usePublicSettings } from "@/hooks/usePublicSettings";
import type { EmergencyContact } from "@/types/settings";

// Chi dung khi cau hinh emergency_contacts trong (chua nhap) - day la cac so
// khan cap quoc gia, khong phai du lieu mau.
const FALLBACK_CONTACTS: EmergencyContact[] = [
  { label: "Công an", phone: "113" },
  { label: "Cứu hỏa", phone: "114" },
  { label: "Cấp cứu", phone: "115" },
];

export type EmergencyContactView = EmergencyContact & {
  // Nhan ngan, bo phan "(113)" lap lai so dien thoai, vd "Công an (113)" -> "Công an".
  shortLabel: string;
};

function toView(contact: EmergencyContact): EmergencyContactView {
  const phone = contact.phone.trim();
  const escaped = phone.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const shortLabel = contact.label
    .replace(new RegExp(`\\s*[(\\[]\\s*${escaped}\\s*[)\\]]\\s*`), " ")
    .trim();
  return { label: contact.label, phone, shortLabel: shortLabel || contact.label };
}

export function useEmergencyContacts() {
  const query = usePublicSettings();
  const configured = (query.data?.emergency_contacts ?? []).filter(
    c => c && c.phone?.trim() && c.label?.trim(),
  );
  const contacts = (configured.length > 0 ? configured : FALLBACK_CONTACTS).map(toView);
  return { contacts, isLoading: query.isLoading };
}
