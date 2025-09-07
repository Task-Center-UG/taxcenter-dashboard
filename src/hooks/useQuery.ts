"use client";

import { useState, useEffect, useCallback } from "react";
import apiFetch from "@/utils/apiFetch";

export const useQuery = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFetch(endpoint, { method: "GET" });
      if (!response.ok) throw new Error("Network response was not ok");
      const json = await response.json();

      setData(json.data || json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
