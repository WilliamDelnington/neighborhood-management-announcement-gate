export type FileAssetCategory = "form" | "attachment" | "minutes" | "other";

export type FileAsset = {
  _id: string;
  name: string;
  description?: string;
  url: string;
  mimeType?: string;
  sizeBytes?: number;
  category: FileAssetCategory;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};
