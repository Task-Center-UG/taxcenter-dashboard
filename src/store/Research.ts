export interface Research {
  id: number | string;
  title: string;
  description: string;
  research_category_id: number;
  cta_url?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: {
    username: string;
  };
  updated_by?: {
    username: string;
  };
  researchCategory?: {
    id: number;
    title: string;
  };
}

export interface Researches {
  researches: Research[];
}
