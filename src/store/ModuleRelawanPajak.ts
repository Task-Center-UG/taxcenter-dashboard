import { UserReference } from "./User";

export interface Modules {
  taxModules: Module[];
}

export type Module = {
  id: number;
  category: string;
  title: string;
  description: string;
  file_url: string;
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
  taxModules: Module[];
  paging: Paging;
};
