"use client";

import { useMutation } from "./useMutation";
import { useNotification } from "@/context/NotificationContext";

export const useMutationWithNotification = <
  T,
  K extends Record<string, any>
>() => {
  const { mutate, isMutating, error } = useMutation<T, K>();
  const { showError, showNotification } = useNotification();

  const mutateWithNotification = async (
    endpoint: string,
    method: "POST" | "PUT" | "PATCH" | "DELETE",
    payload?: K,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      const result = await mutate(endpoint, method, payload);
      if (result && successMessage) {
        showNotification(successMessage, "success");
      }
      return result;
    } catch (err: any) {
      showError(err);
      return null;
    }
  };

  return { mutate: mutateWithNotification, isMutating, error };
};
