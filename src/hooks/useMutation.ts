"use client";

import { useState } from "react";
import apiFetch from "@/utils/apiFetch";

export const useMutation = <T, K extends Record<string, any>>() => {
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    payload?: K
  ): Promise<T | null> => {
    setIsMutating(true);
    setError(null);

    let body: BodyInit | undefined;
    const headers: HeadersInit = {};

    // Check if payload is already FormData
    if (payload instanceof FormData) {
      body = payload;
      // Don't set Content-Type for FormData, browser will set it with boundary
    } else {
      // Check if payload contains File objects
      const isMultipart = payload
        ? Object.values(payload).some((value) => value instanceof File)
        : false;

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
    }

    try {
      const response = await apiFetch(endpoint, {
        method,
        body,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorObject = {
          status: response.statusText,
          code: response.status,
          error: {
            message:
              errorData?.error?.message ||
              errorData?.message ||
              `Request failed with status ${response.status}`,
          },
        };
        setError(errorObject);
        throw errorObject;
      }

      if (response.status === 204) {
        return {} as T;
      }

      const json = await response.json();
      return json.data || json;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  return { mutate, isMutating, error };
};
