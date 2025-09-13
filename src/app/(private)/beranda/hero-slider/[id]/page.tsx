"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { Slider } from "@/store/Slider";
import { Card } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const { data: sliders, isLoading, error } = useQuery<Slider>("cms/sliders");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => window.history.back()}
        />
        <div className="flex gap-4">
          <ButtonCustom label="Delete" color="error" />
          <ButtonCustom label="Edit" to={`/dashboard/hero-slider/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={"-"} />
          <ValueColumn label="Created At" value={"-"} />
          <ValueColumn label="Updated At" value={"-"} />
        </div>
      </Card>

      <Card>
        <HeaderTitle>Media</HeaderTitle>
        <div className="p-8 flex flex-col gap-4"></div>
      </Card>
    </div>
  );
};

export default page;
