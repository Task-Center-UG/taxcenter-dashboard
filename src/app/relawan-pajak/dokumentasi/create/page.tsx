"use client";

import React, { useState } from "react";
import { Card, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableInput from "@/components/input/ReusableInput";
import ReusableUploadZone from "@/components/input/ReusableUploadZone";
import { useTaxVolunteerDocumentation } from "@/hooks/useTaxVolunteerDocumentation";

type FormData = {
  title: string;
  date?: string;
  location?: string;
  images: File[] | null;
};

const CreateDocumentationPage = () => {
  const router = useRouter();
  const { createDocumentation, uploadFile, isMutating } =
    useTaxVolunteerDocumentation();
  const [isUploading, setIsUploading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      images: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Step 1: Create documentation
      const documentationResult = await createDocumentation({
        title: data.title,
        date: data.date,
        location: data.location,
      });

      if (!documentationResult) {
        return;
      }

      // Get the ID from response
      const documentationId = documentationResult.data?.id;

      if (!documentationId) {
        console.error("No documentation ID returned");
        return;
      }

      // Step 2: Upload images if any
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        setIsUploading(true);

        for (const file of data.images) {
          await uploadFile(documentationId, file);
        }

        setIsUploading(false);
      }

      router.push("/relawan-pajak/dokumentasi");
    } catch (error) {
      console.error("Error creating documentation:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <HeaderTitle>Create New Documentation</HeaderTitle>
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.back()}
        />
      </div>

      {isUploading && (
        <Alert severity="info">Uploading images... Please wait.</Alert>
      )}

      <Card>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Documentation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Documentation Details</h3>

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
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload Images</h3>
              <p className="text-sm text-gray-500">
                Upload one or multiple images (JPG, JPEG, PNG)
              </p>

              <ReusableUploadZone
                name="images"
                control={control}
                accept="image/jpeg,image/jpg,image/png"
                multiple
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <ButtonCustom
                label="Cancel"
                color="default"
                onClick={() => router.back()}
                disabled={isMutating || isUploading}
              />
              <ButtonCustom
                label={isUploading ? "Uploading..." : "Create"}
                type="submit"
                isLoading={isMutating || isUploading}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateDocumentationPage;
