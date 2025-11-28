"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { Trainings } from "@/store/Training";

const page = () => {
  const route = useRouter();
  const { data: trainings, isLoading, error } = useQuery<Trainings>("training");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() =>
              route.push("/program/pengabdian/pelatihan-umkm/create")
            }
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={trainings?.trainings ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
