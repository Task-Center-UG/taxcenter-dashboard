export type TaxVolunteerMBKM = {
  id: number;
  full_name: string;
  npm: string;
  Major: {
    id: number;
    name: string;
  };
  phone_number: string;
  email: string;
  period: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by?: {
    id: number;
    username: string;
  };
  updated_by?: {
    id: number;
    username: string;
  };
};

export type TaxVolunteerMBKMDetail = {
  id: number;
  full_name: string;
  class: string;
  npm: string;
  address: string;
  phone_number: string;
  email: string;
  tax_volunteer_activities: string;
  is_already_tax_volunteer: string;
  ipk: number;
  krs: string;
  transcripts: string;
  status: string;
  created_at: string;
  updated_at: string;
  region_id: number;
  major_id: number;
  Region: {
    id: number;
    name: string;
  };
  Major: {
    id: number;
    name: string;
  };
  created_by?: {
    id: number;
    username: string;
  };
  updated_by?: {
    id: number;
    username: string;
  };
};

export type TaxVolunteerMBKMs = {
  registrations: TaxVolunteerMBKM[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
};

export type TaxVolunteerNonMBKM = {
  id: number;
  full_name: string;
  npm: string;
  Major: {
    id: number;
    name: string;
  };
  phone_number: string;
  email: string;
  period: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by?: {
    id: number;
    username: string;
  };
  updated_by?: {
    id: number;
    username: string;
  };
};

export type TaxVolunteerNonMBKMDetail = {
  id: number;
  full_name: string;
  class: string;
  npm: string;
  address: string;
  phone_number: string;
  email: string;
  tax_volunteer_activities: string;
  is_already_tax_volunteer: string;
  ipk: number;
  krs: string;
  transcripts: string;
  status: string;
  created_at: string;
  updated_at: string;
  region_id: number;
  major_id: number;
  Region: {
    id: number;
    name: string;
  };
  Major: {
    id: number;
    name: string;
  };
  created_by?: {
    id: number;
    username: string;
  };
  updated_by?: {
    id: number;
    username: string;
  };
};

export type TaxVolunteerNonMBKMs = {
  registrations: TaxVolunteerNonMBKM[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
};
