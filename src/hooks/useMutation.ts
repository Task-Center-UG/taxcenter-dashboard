"use client";

import { useState } from "react";
import apiFetch from "@/utils/apiFetch";

export const useMutation = <T, K>() => {
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    payload?: K
  ): Promise<T | null> => {
    setIsMutating(true);
    setError(null);
    try {
      const response = await apiFetch(endpoint, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData?.error?.message ||
          `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      if (response.status === 204) {
        return {} as T;
      }

      const json = await response.json();
      return json.data || json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsMutating(false);
    }
  };

  return { mutate, isMutating, error };
};
