import { useMutationWithNotification } from "./useMutationWithNotification";
import { useQueryWithPagination } from "./useQueryWithPagination";
import { TaxVolunteerDocumentations } from "@/store/TaxVolunteerDocumentation";
import { useUserProfile } from "./useUserProfile";
import { useMemo } from "react";

export const useTaxVolunteerDocumentation = () => {
  const { userData } = useUserProfile();

  const additionalParams = useMemo(() => {
    if (userData?.id) {
      return { user_id: userData.id };
    }
    return undefined;
  }, [userData?.id]);

  // Only fetch when userData is loaded
  const { data, isLoading, refetch, handlePageChange } =
    useQueryWithPagination<TaxVolunteerDocumentations>(
      "tax-volunteer-documentation",
      1,
      10,
      additionalParams,
      !!userData?.id // Only enable fetch when user_id is available
    );

  const { mutate, isMutating } = useMutationWithNotification();

  const createDocumentation = async (formData: {
    title: string;
    date?: string;
    location?: string;
  }) => {
    return await mutate(
      "tax-volunteer-documentation",
      "POST",
      formData,
      "Documentation created successfully!"
    );
  };

  const updateDocumentation = async (
    id: number,
    formData: {
      title: string;
      date?: string;
      location?: string;
    }
  ) => {
    return await mutate(
      `tax-volunteer-documentation/${id}`,
      "PUT",
      formData,
      "Documentation updated successfully!"
    );
  };

  const deleteDocumentation = async (id: number) => {
    return await mutate(
      `tax-volunteer-documentation/${id}`,
      "DELETE",
      undefined,
      "Documentation deleted successfully!"
    );
  };

  const uploadFile = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file_url", file);

    return await mutate(
      `tax-volunteer-documentation/${id}/file`,
      "POST",
      formData,
      "File uploaded successfully!"
    );
  };

  const deleteFile = async (fileId: number) => {
    return await mutate(
      `tax-volunteer-documentation/file/${fileId}`,
      "DELETE",
      undefined,
      "File deleted successfully!"
    );
  };

  return {
    data,
    isLoading,
    isMutating,
    handlePageChange,
    refetch,
    createDocumentation,
    updateDocumentation,
    deleteDocumentation,
    uploadFile,
    deleteFile,
  };
};
