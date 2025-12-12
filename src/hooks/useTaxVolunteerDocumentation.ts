import { useMutationWithNotification } from "./useMutationWithNotification";
import { useQuery } from "./useQuery";
import { TaxVolunteerDocumentations } from "@/store/TaxVolunteerDocumentation";
import { useUserProfile } from "./useUserProfile";
import { useState } from "react";

export const useTaxVolunteerDocumentation = () => {
  const { userData } = useUserProfile();
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = userData?.id
    ? `?user_id=${userData.id}&page=${currentPage}`
    : `?page=${currentPage}`;

  const { data, isLoading, refetch } = useQuery<TaxVolunteerDocumentations>(
    `tax-volunteer-documentation${queryParams}`
  );

  const { mutate, isMutating } = useMutationWithNotification();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

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
    currentPage,
    handlePageChange,
    refetch,
    createDocumentation,
    updateDocumentation,
    deleteDocumentation,
    uploadFile,
    deleteFile,
  };
};
