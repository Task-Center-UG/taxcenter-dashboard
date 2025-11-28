export interface AgendaSlider {
  id: number | string;
  title: string;
  picture_url?: string;
  created_by?: any;
  created_at?: string;
  updated_by?: any;
  updated_at?: string;
}

export interface AgendaSliders {
  agendaSliders: AgendaSlider[];
}
