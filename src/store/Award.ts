export interface Award {
  id: number | string;
  title: string;
  picture_url: string;
}

export interface Awards {
  awards: Award[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}
