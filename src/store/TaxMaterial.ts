export interface TaxMaterial {
  id: number | string;
  title: string;
  description: string;
  video_url?: string;
  file_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface TaxMaterials {
  taxMaterials: TaxMaterial[];
}
