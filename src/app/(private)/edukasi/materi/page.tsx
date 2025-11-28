"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { TaxMaterials } from "@/store/TaxMaterial";

const page = () => {
  const route = useRouter();
  const {
    data: taxMaterials,
    isLoading,
    error,
  } = useQuery<TaxMaterials>("tax-material");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/edukasi/materi/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={taxMaterials?.mappedMaterials ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
