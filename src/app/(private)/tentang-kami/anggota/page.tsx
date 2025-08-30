"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import ReusableTable from "@/components/table/ReusableTable";
import React from "react";
import { columns, data } from "./data";
import { useRouter } from "next/navigation";

const page = () => {
  const route = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-4">
          <ButtonCustom
            label="Add Content"
            onClick={() => route.push("/tentang-kami/anggota/create")}
          />
        </div>
      </div>
      <ReusableTable columns={columns} data={data} />
    </div>
  );
};

export default page;
