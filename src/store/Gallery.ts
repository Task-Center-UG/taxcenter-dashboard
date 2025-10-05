export interface Gallery {
  id: number | string;
  title: string;
  picture_url: string;
  description: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface ListGallery {
  gallerys: Gallery[];
}
