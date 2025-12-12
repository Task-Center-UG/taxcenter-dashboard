"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { UmkmProductPhotos } from "@/store/UmkmProductPhoto";

const page = () => {
  const route = useRouter();
  const { data, isLoading, handlePageChange } =
    useQueryWithPagination<UmkmProductPhotos>("umkm-product-photo");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() =>
              route.push("/program/pengabdian/foto-produk-umkm/create")
            }
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={data?.umkmProductPhoto ?? []}
        isLoading={isLoading}
        paging={data?.paging}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default page;
