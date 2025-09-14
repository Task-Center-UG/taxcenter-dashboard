"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Divisions } from "@/store/Division";

const page = () => {
  const route = useRouter();
  const { data: division, isLoading, error } = useQuery<Divisions>("divisions");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/tentang-kami/divisi/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={division?.divisions ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
