"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Divisions } from "@/store/Division";
import { Modules } from "@/store/ModuleRelawanPajak";

const page = () => {
  const route = useRouter();
  const { data: module, isLoading, error } = useQuery<Modules>("tax-module");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/program/relawan-pajak/modul/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={module?.taxModules ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
