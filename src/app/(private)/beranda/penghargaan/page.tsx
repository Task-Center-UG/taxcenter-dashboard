"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Award, Awards } from "@/store/Award";

const page = () => {
  const route = useRouter();
  const { data: awards, isLoading, error } = useQuery<Awards>("awards");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/beranda/penghargaan/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={awards?.awards ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
