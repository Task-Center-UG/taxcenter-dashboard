"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/useQuery";
import AddIcon from "@mui/icons-material/Add";
import { ListGallery } from "@/store/Gallery";

const page = () => {
  const route = useRouter();
  const { data: gallery, isLoading, error } = useQuery<ListGallery>("gallery");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/galeri/foto-kegiatan/create")}
            startIcon={<AddIcon sx={{ fontSize: 20 }} color="inherit" />}
          />
        </div>
      </div>
      <ReusableTable
        columns={columns}
        data={gallery?.gallerys ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default page;
