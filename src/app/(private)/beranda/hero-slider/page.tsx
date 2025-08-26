"use client";

import ReusableTable from "@/components/table/ReusableTable";
import { columns, data } from "@/store/DummyData";
import React from "react";

const page = () => {
  return (
    <div>
      <ReusableTable columns={columns} data={data} />
    </div>
  );
};

export default page;
