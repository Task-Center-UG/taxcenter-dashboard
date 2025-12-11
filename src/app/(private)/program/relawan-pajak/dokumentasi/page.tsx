"use client";

import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerDocumentations } from "@/store/TaxVolunteerDocumentation";

const DokumentasiPage = () => {
  const {
    data: documentations,
    isLoading,
    error,
  } = useQuery<TaxVolunteerDocumentations>("tax-volunteer-documentation");

  return (
    <div className="flex flex-col gap-4">
      <ReusableTable
        columns={columns}
        data={documentations?.taxVolunteerDocumentations ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DokumentasiPage;
