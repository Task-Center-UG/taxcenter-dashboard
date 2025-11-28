"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Publications } from "@/store/Publication";

const page = () => {
  const route = useRouter();
  const {
    data: publications,
    isLoading,
    error,
  } = useQuery<Publications>("publication");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/kegiatan/publikasi/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={publications?.publications ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
