"use client";

import { useState, useEffect, useCallback } from "react";
import apiFetch from "@/utils/apiFetch";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PagingInfo } from "@/components/table/ReusableTable";

interface QueryResponse<T> {
  paging?: PagingInfo;
}

export const useQueryWithPagination = <T extends QueryResponse<any>>(
  endpoint: string,
  defaultPage: number = 1,
  defaultSize: number = 10
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || String(defaultPage));
  const size = parseInt(searchParams.get("size") || String(defaultSize));

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("size", String(size));

      const response = await apiFetch(`${endpoint}?${params.toString()}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const json = await response.json();

      setData(json.data || json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, page, size]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", String(newSize));
    params.set("page", "1"); // Reset to page 1 when size changes
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    page,
    size,
    handlePageChange,
    handleSizeChange,
  };
};
