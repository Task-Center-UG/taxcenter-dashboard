"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { TaxClinics } from "@/store/TaxClinic";

const page = () => {
  const route = useRouter();
  const {
    data: taxClinics,
    isLoading,
    error,
  } = useQuery<TaxClinics>("tax-clinic-service");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() =>
              route.push("/program/tax-clinic/info-edukasi/create")
            }
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={taxClinics?.taxClinicServices ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
