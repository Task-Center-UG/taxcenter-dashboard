"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { AgendaSlider } from "@/store/AgendaSlider";

const page = () => {
  const route = useRouter();
  const {
    data: agendaSliders,
    isLoading,
    error,
  } = useQuery<AgendaSlider[]>("activity-agenda-image-slider");

  console.log(agendaSliders);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/kegiatan/agenda/slider/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={agendaSliders ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
