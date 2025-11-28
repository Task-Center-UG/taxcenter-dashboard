export interface News {
  id: number | string;
  title: string;
  description: string;
  picture_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface NewsList {
  news: News[];
}
