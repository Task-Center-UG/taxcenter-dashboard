export interface AfternoonTalk {
  id: number | string;
  title: string;
  description: string;
  video_url?: string;
  spotify_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface AfternoonTalks {
  afternoonTalks: AfternoonTalk[];
}
