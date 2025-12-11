"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { Articles } from "@/store/Article";

const page = () => {
  const route = useRouter();
  const { data, isLoading, handlePageChange } =
    useQueryWithPagination<Articles>("article");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/kegiatan/artikel/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={data?.articles ?? []}
        isLoading={isLoading}
        paging={data?.paging}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default page;
