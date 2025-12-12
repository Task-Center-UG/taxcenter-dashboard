import { useQuery } from "./useQuery";
import { Modules } from "@/store/ModuleRelawanPajak";
import { useState } from "react";

export const useTaxModule = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = `?page=${currentPage}`;

  const { data, isLoading, refetch } = useQuery<Modules>(
    `tax-module${queryParams}`
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    currentPage,
    handlePageChange,
    refetch,
  };
};
