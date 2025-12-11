export interface TaxLearningVideo {
  id: number | string;
  title: string;
  description: string;
  video_url?: string;
  image_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface TaxLearningVideos {
  taxLearningVideos: TaxLearningVideo[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
