"use client";

import React from "react";
import TabsLayout from "@/components/appbar/TabsLayout";
import ReusableTable from "@/components/table/ReusableTable";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { TaxVolunteerMBKMs, TaxVolunteerNonMBKMs } from "@/store/TaxVolunteer";
import { mbkmColumns, nonMbkmColumns } from "./data";

const MBKMTable = () => {
  const {
    data: mbkmData,
    isLoading: mbkmLoading,
    handlePageChange: mbkmHandlePageChange,
  } = useQueryWithPagination<TaxVolunteerMBKMs>(
    "tax-volunteer/mbkm-registration"
  );

  return (
    <ReusableTable
      columns={mbkmColumns}
      data={mbkmData?.registrations ?? []}
      isLoading={mbkmLoading}
      paging={mbkmData?.paging}
      onPageChange={mbkmHandlePageChange}
    />
  );
};

const NonMBKMTable = () => {
  const {
    data: nonMbkmData,
    isLoading: nonMbkmLoading,
    handlePageChange: nonMbkmHandlePageChange,
  } = useQueryWithPagination<TaxVolunteerNonMBKMs>(
    "tax-volunteer/non-mbkm-registration"
  );

  return (
    <ReusableTable
      columns={nonMbkmColumns}
      data={nonMbkmData?.registrations ?? []}
      isLoading={nonMbkmLoading}
      paging={nonMbkmData?.paging}
      onPageChange={nonMbkmHandlePageChange}
    />
  );
};

const PenggunaRelawanPajakPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <TabsLayout
        labels={["MBKM", "Non MBKM"]}
        panels={[<MBKMTable key="mbkm" />, <NonMBKMTable key="non-mbkm" />]}
        initialTab={0}
        tabVariant="fullWidth"
      />
    </div>
  );
};

export default PenggunaRelawanPajakPage;
