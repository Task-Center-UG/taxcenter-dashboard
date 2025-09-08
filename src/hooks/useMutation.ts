"use client";

import { useState } from "react";
import apiFetch from "@/utils/apiFetch";

export const useMutation = <T, K extends Record<string, any>>() => {
  // Add constraint to K
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    payload?: K
  ): Promise<T | null> => {
    setIsMutating(true);
    setError(null);

    const isMultipart = payload
      ? Object.values(payload).some((value) => value instanceof File)
      : false;

    let body: BodyInit | undefined;
    const headers: HeadersInit = {};

    if (isMultipart && payload) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      body = formData;
    } else {
      body = payload ? JSON.stringify(payload) : undefined;
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await apiFetch(endpoint, {
        method,
        body,
        headers,
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
