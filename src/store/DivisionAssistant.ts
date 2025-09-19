import { UserReference } from "./User";

export type DivisionAssistant = {
  id: number;
  name: string;
  division_id: number;
  major_id: number;
  picture_url: string;
  created_at: string;
  updated_at: string;
  created_by: UserReference;
  updated_by: UserReference;
};

export type DivisionAssistants = {
  divisionAssistants: DivisionAssistant[];
};
