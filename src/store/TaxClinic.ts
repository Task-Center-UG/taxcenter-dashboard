export type TaxClinicCategory =
  | "CORETAX"
  | "NPWP_CREATION"
  | "SPT_FILLING"
  | "E_BILLING_CREATION";

export interface TaxClinic {
  id: number | string;
  title: string;
  category: TaxClinicCategory;
  video_url?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: {
    username: string;
  };
  updated_by?: {
    username: string;
  };
}

export interface TaxClinics {
  taxClinicServices: TaxClinic[];
}
