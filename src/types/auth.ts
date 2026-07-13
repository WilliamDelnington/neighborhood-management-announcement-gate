export const ROLES = [
  "resident",
  "neighborhood_leader",
  "secretary",
  "regional_police",
  "people_committee_official",
  "admin",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  resident: "Người dân",
  neighborhood_leader: "Tổ trưởng",
  secretary: "Bí thư",
  regional_police: "Công an khu vực",
  people_committee_official: "Cán bộ UBND",
  admin: "Quản trị viên",
};

export type User = {
  id: string;
  displayName: string;
  phone?: string;
  email?: string;
  address?: string;
  avatarUrl?: string;
  roles: Role[];
  primaryRole: Role;
  status: "active" | "pending" | "locked";
  createdAt: string;
};

export type LoginInput = {
  phone: string;
  password: string;
};

export type RegisterInput = {
  phone: string;
  password: string;
  displayName: string;
};

export type AuthSession = {
  token: string;
  user: User;
};
