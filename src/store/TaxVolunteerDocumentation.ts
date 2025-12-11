export type TaxVolunteerDocumentationFile = {
  id: number;
  file_name: string;
  file_url: string;
  created_at: string;
};

export type TaxVolunteerDocumentation = {
  id: number;
  title: string;
  description: string;
  period: string;
  files: TaxVolunteerDocumentationFile[];
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

export type TaxVolunteerDocumentations = {
  taxVolunteerDocumentations: TaxVolunteerDocumentation[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};
