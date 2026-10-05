export type PublicNeighborhood = {
  _id: string;
  name: string;
  code: string;
  wardName: string | null;
  address: string;
  description: string;
  // So lien he CHINH THUC cua to (khong phai so ca nhan cua to truong).
  contactPhone: string;
  leaderName: string;
  streets: string[];
  alleyDescriptions: string[];
};

export type PublicNeighborhoodsData = {
  items: PublicNeighborhood[];
};
