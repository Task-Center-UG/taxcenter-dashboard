export interface PagingInfo {
  page: number;
  total_pages: number;
  total_items: number;
}

export interface PaginatedResponse<T> {
  paging?: PagingInfo;
}
