"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { AfternoonTalks } from "@/store/AfternoonTalk";

const page = () => {
  const route = useRouter();
  const {
    data: podcasts,
    isLoading,
    error,
  } = useQuery<AfternoonTalks>("afternoon-talk");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/edukasi/podcast/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={podcasts?.afternoonTalks ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
