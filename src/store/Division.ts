import { UserReference } from "./User";

export interface Divisions {
  divisions: Division[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

export type Division = {
  id: number;
  name: string;
  picture_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: UserReference;
  updated_by: UserReference;
};

export type Paging = {
  page: number;
  total_pages: number;
  total_items: number;
};

export type DivisionsResponse = {
  divisions: Division[];
  paging: Paging;
};
