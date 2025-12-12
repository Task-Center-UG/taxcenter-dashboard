export interface ResearchCategory {
  id: number | string;
  title: string;
  created_at?: string;
  updated_at?: string;
  created_by?: {
    username: string;
  };
  updated_by?: {
    username: string;
  };
}

export interface ResearchCategories {
  researchCategory: ResearchCategory[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
