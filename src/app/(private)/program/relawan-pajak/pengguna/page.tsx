"use client";

import React from "react";
import TabsLayout from "@/components/appbar/TabsLayout";
import ReusableTable from "@/components/table/ReusableTable";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerMBKMs, TaxVolunteerNonMBKMs } from "@/store/TaxVolunteer";
import { mbkmColumns, nonMbkmColumns } from "./data";

const MBKMTable = () => {
  const {
    data: mbkmData,
    isLoading: mbkmLoading,
    error: mbkmError,
  } = useQuery<TaxVolunteerMBKMs>("tax-volunteer/mbkm-registration");

  return (
    <ReusableTable
      columns={mbkmColumns}
      data={mbkmData?.registrations ?? []}
      isLoading={mbkmLoading}
    />
  );
};

const NonMBKMTable = () => {
  const {
    data: nonMbkmData,
    isLoading: nonMbkmLoading,
    error: nonMbkmError,
  } = useQuery<TaxVolunteerNonMBKMs>("tax-volunteer/non-mbkm-registration");

  return (
    <ReusableTable
      columns={nonMbkmColumns}
      data={nonMbkmData?.registrations ?? []}
      isLoading={nonMbkmLoading}
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
