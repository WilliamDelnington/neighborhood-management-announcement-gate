export type AppIdentity = {
  name: string;
  ward: string;
  city: string;
};

export type EmergencyContact = {
  label: string;
  phone: string;
};

export type PublicSettings = {
  app_identity?: AppIdentity;
  emergency_contacts?: EmergencyContact[];
};
