"use client";

import HeaderTitle from "@/components/card/HeaderTitle";
import { Paper } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <Paper>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 flex flex-col gap-4"></div>
      </Paper>
      <Paper>
        <HeaderTitle>Media</HeaderTitle>
        <div className="p-8 flex flex-col gap-4"></div>
      </Paper>
    </div>
  );
};

export default page;
