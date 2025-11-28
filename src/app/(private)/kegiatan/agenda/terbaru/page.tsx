"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { NewsList } from "@/store/News";

const page = () => {
  const route = useRouter();
  const { data: newsList, isLoading, error } = useQuery<NewsList>("news");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/kegiatan/agenda/terbaru/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={newsList?.news ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
