export interface Publication {
  id: number | string;
  title: string;
  description: string;
  year?: number;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Publications {
  publications: Publication[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
