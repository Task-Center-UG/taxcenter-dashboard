"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Fgds } from "@/store/Fgd";

const page = () => {
  const route = useRouter();
  const { data: fgds, isLoading, error } = useQuery<Fgds>("fgd");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() =>
              route.push("/program/pengabdian/pendampingan-umkm/create")
            }
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={fgds?.fgds ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
