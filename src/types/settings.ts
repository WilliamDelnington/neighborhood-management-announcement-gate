export type AppIdentity = {
  name: string;
  ward: string;
  city: string;
};

export type EmergencyContact = {
  label: string;
  phone: string;
};

export type CommitteeMember = {
  role: string;
  name: string;
  phone: string;
};

export type CommunityStats = {
  totalHouseholds: number;
  totalResidents: number;
  leaderName: string;
  termLabel: string;
};

export type PublicSettings = {
  app_identity?: AppIdentity;
  emergency_contacts?: EmergencyContact[];
  committee_members?: CommitteeMember[];
  community_stats?: CommunityStats;
};
