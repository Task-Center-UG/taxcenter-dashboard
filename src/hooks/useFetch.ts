"use server";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export default function useFetch<T>(endpoint: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
          {
            withCredentials: true,
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setData(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
          return;
        }
        const axiosError = err as AxiosError<{ message: string }>;
        console.error("Failed to fetch data:", axiosError);
        setError(axiosError.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return { data, loading, error };
}
