export type AppIdentity = {
  name: string;
  ward: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: string;
};

export type EmergencyContact = {
  label: string;
  phone: string;
};

export type PublicSettings = {
  announcement_gate_footer?: {
    unitName: string;
    address: string;
    phone: string;
    email: string;
    officeHours: string;
    content: string;
    copyright: string;
    showEmergencyContacts: boolean;
  };
  app_identity?: AppIdentity;
  emergency_contacts?: EmergencyContact[];
  // Duong dan anh do admin tai len (thuong la duong dan tuong doi
  // /uploads/...) - luon di qua resolveAssetUrl truoc khi dung.
  announcement_gate_billboard_url?: string | null;
  announcement_gate_logo_url?: string | null;
};
