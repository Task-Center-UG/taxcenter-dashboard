"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import type { DivisionsResponse } from "@/store/Division";

type UseDivisionsProps = {
  page?: number;
  limit?: number;
};

const getDivisions = async ({
  page = 1,
  limit = 100,
}: UseDivisionsProps): Promise<DivisionsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await apiFetch(`/divisions?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch divisions");
  }
  const json = await response.json();
  return json.data;
};

export const useDivisions = ({ page, limit = 10 }: UseDivisionsProps = {}) => {
  const { data, isLoading, error } = useQuery<DivisionsResponse, Error>({
    queryKey: ["divisions", { page, limit }],

    queryFn: () => getDivisions({ page, limit }),

    placeholderData: keepPreviousData,

    staleTime: 1000 * 60,
  });

  return {
    divisions: data?.divisions,
    paging: data?.paging,
    isLoading,
    error,
  };
};
