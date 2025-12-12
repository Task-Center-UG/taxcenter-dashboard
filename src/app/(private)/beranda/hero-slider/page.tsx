"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { Slider } from "@/store/Slider";
import AddIcon from "@mui/icons-material/Add";

interface Sliders {
  sliders: Slider[];
  paging?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
}

const page = () => {
  const route = useRouter();
  const { data, isLoading, handlePageChange } =
    useQueryWithPagination<Sliders>("cms/sliders");

  console.log("[HeroSlider] data:", data);
  console.log("[HeroSlider] paging:", data?.paging);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/beranda/hero-slider/create")}
            startIcon={<AddIcon sx={{ fontSize: 20 }} color="inherit" />}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={data?.sliders ?? []}
        isLoading={isLoading}
        paging={data?.paging}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default page;
