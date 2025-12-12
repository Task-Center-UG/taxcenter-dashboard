export interface TaxMaterial {
  id: number | string;
  title: string;
  description: string;
  file_url?: string;
  image_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface TaxMaterials {
  mappedMaterials: TaxMaterial[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
