"use client";

import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";

type ResearchCategory = {
  id: number;
  title: string;
};

type ResearchCategoryOption = {
  value: number;
  label: string;
};

const getResearchCategories = async (): Promise<ResearchCategory[]> => {
  const response = await apiFetch("/research-category");
  if (!response.ok) {
    throw new Error("Failed to fetch research categories");
  }
  const json = await response.json();
  return json.data.researchCategory;
};

export const useResearchCategories = () => {
  const {
    data: researchCategoryOptions,
    isLoading,
    error,
  } = useQuery<ResearchCategory[], Error, ResearchCategoryOption[]>({
    queryKey: ["research-categories"],

    queryFn: getResearchCategories,

    select: (data) =>
      data.map((category) => ({
        value: category.id,
        label: category.title,
      })),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { researchCategoryOptions, isLoading, error };
};
