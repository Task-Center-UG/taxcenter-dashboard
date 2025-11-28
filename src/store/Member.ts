export interface Member {
  id: number | string;
  name: string;
  position: string;
  npm: string;
  major: string;
  picture_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface Members {
  members: Member[];
}
