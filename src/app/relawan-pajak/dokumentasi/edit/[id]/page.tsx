"use client";

import React from "react";
import { Card } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import { useTaxVolunteerDocumentation } from "@/hooks/useTaxVolunteerDocumentation";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerDocumentation } from "@/store/TaxVolunteerDocumentation";
import Loader from "@/components/loading/Loader";

type FormData = {
  title: string;
  date?: string;
  location?: string;
};

const EditDocumentationPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { updateDocumentation, isMutating } = useTaxVolunteerDocumentation();

  const { data: documentation, isLoading } =
    useQuery<TaxVolunteerDocumentation>(`tax-volunteer-documentation/${id}`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: documentation
      ? {
          title: documentation.title,
          date: documentation.date
            ? new Date(documentation.date).toISOString().split("T")[0]
            : "",
          location: documentation.location || "",
        }
      : undefined,
  });

  const onSubmit = async (data: FormData) => {
    const result = await updateDocumentation(Number(id), data);
    if (result) {
      router.push("/relawan-pajak/dokumentasi");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <HeaderTitle>Edit Documentation</HeaderTitle>
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.back()}
        />
      </div>

      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ReusableInput
              name="title"
              control={control}
              errors={errors}
              label="Title"
              placeholder="Enter documentation title"
              rules={{ required: "Title is required" }}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <ReusableInput
              name="date"
              control={control}
              errors={errors}
              label="Date"
              type="date"
              placeholder="Select date"
            />

            <ReusableInput
              name="location"
              control={control}
              errors={errors}
              label="Location"
              placeholder="Enter location"
            />

            <div className="flex justify-end gap-2 mt-6">
              <ButtonCustom
                label="Cancel"
                color="default"
                onClick={() => router.back()}
              />
              <ButtonCustom
                label="Update"
                type="submit"
                isLoading={isMutating}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditDocumentationPage;
