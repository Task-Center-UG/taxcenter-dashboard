export type TaxVolunteerDocumentationFile = {
  id: number;
  file_url: string;
  created_at: string;
  updated_at: string;
  tax_volunteer_documentation_id: number;
  file_name: string;
};

export type TaxVolunteerDocumentation = {
  id: number;
  title: string;
  date: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  User: {
    id: number;
    username: string;
    full_name: string;
  };
  create_tax_volunteer_documentation_file: TaxVolunteerDocumentationFile[];
  description: string | null;
  period: string | null;
  files: TaxVolunteerDocumentationFile[];
  created_by?: {
    id: number;
    username: string;
    full_name: string;
  } | null;
  updated_by?: {
    id: number;
    username: string;
    full_name: string;
  } | null;
};

export type TaxVolunteerDocumentations = {
  documentations: TaxVolunteerDocumentation[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
};
