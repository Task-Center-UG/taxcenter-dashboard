export interface Award {
  id: number | string;
  title: string;
  picture_url: string;
}

export interface Awards {
  awards: Award[];
}
