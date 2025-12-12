export interface Article {
  id: number | string;
  title: string;
  description: string;
  image_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Articles {
  articles: Article[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
