"use client";

import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";

type Major = {
  id: number;
  name: string;
};

type MajorOption = {
  value: number;
  label: string;
};

const getMajors = async (): Promise<Major[]> => {
  const response = await apiFetch("/majors");
  if (!response.ok) {
    throw new Error("Failed to fetch majors");
  }
  const json = await response.json();
  return json.data;
};

export const useMajors = () => {
  const {
    data: majorOptions,
    isLoading,
    error,
  } = useQuery<Major[], Error, MajorOption[]>({
    queryKey: ["majors"],

    queryFn: getMajors,

    select: (data) =>
      data.map((major) => ({
        value: major.id,
        label: major.name,
      })),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { majorOptions, isLoading, error };
};
