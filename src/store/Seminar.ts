export interface Seminar {
  id: number | string;
  title: string;
  description: string;
  picture_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Seminars {
  seminars: Seminar[];
}
