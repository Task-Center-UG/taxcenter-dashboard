"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { Researches } from "@/store/Research";

const page = () => {
  const route = useRouter();
  const { data, isLoading, handlePageChange } =
    useQueryWithPagination<Researches>("research");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/program/riset/kerja-sama/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={data?.research ?? []}
        isLoading={isLoading}
        paging={data?.paging}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default page;
