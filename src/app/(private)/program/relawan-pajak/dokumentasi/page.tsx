"use client";

import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { TaxVolunteerDocumentations } from "@/store/TaxVolunteerDocumentation";

const DokumentasiPage = () => {
  const { data, isLoading, handlePageChange } =
    useQueryWithPagination<TaxVolunteerDocumentations>(
      "tax-volunteer-documentation"
    );

  return (
    <div className="flex flex-col gap-4">
      <ReusableTable
        columns={columns}
        data={data?.documentations ?? []}
        isLoading={isLoading}
        paging={data?.paging}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DokumentasiPage;
