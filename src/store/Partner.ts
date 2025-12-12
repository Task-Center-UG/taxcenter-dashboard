export interface Partner {
  id: number | string;
  name: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Partners {
  partners: Partner[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
