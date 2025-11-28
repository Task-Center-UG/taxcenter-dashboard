"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import { TaxLearningVideos } from "@/store/TaxLearningVideo";

const page = () => {
  const route = useRouter();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery<TaxLearningVideos>("tax-learning-video");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/edukasi/video/create")}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={videos?.taxLearningVideos ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
