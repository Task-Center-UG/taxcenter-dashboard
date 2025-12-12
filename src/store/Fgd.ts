export interface Fgd {
  id: number | string;
  title: string;
  description: string;
  image_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Fgds {
  fgds: Fgd[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
