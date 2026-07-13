export type Meeting = {
  _id: string;
  title: string;
  startTime: string;
  location: string;
  content: string;
  minutes?: string;
  attachments: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
