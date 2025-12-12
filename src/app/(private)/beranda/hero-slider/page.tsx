"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns } from "./data";
import { useRouter } from "next/navigation";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { Slider } from "@/store/Slider";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@/hooks/useQuery";

export interface SliderUser {
  id: number;
  username: string;
  full_name: string;
}

export interface Sliders {
  id: number;
  title: string;
  picture_url: string;
  cta_url: string;
  created_at: string;
  updated_at: string;
  created_by: SliderUser;
  updated_by: SliderUser;
}

const page = () => {
  const route = useRouter();
  const { data, isLoading } = useQuery<Sliders[]>("cms/sliders");

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
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
