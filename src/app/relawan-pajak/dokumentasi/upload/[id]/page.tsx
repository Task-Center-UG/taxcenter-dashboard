"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ReusableUploadZone from "@/components/input/ReusableUploadZone";
import { useTaxVolunteerDocumentation } from "@/hooks/useTaxVolunteerDocumentation";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerDocumentation } from "@/store/TaxVolunteerDocumentation";
import Loader from "@/components/loading/Loader";
import ImagePreviewWithDelete from "@/components/image/ImagePreviewWithDelete";
import { ValueColumn } from "@/components/value/ValueColumn";

type FormData = {
  file_url: File | null;
};

const UploadDocumentationPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { uploadFile, deleteFile, isMutating } = useTaxVolunteerDocumentation();

  const {
    data: documentation,
    isLoading,
    refetch,
  } = useQuery<TaxVolunteerDocumentation>(`tax-volunteer-documentation/${id}`);

  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      file_url: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!data.file_url) {
      console.error("No file selected");
      return;
    }

    // Handle if file_url is an array (from ReusableUploadZone multiple)
    const file = Array.isArray(data.file_url)
      ? data.file_url[0]
      : data.file_url;

    if (!file) {
      console.error("No valid file found");
      return;
    }

    const result = await uploadFile(Number(id), file);
    if (result) {
      reset();
      refetch();
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    setDeletingFileId(fileId);
    const result = await deleteFile(fileId);
    if (result) {
      refetch();
    }
    setDeletingFileId(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <HeaderTitle>Upload Images - {documentation?.title}</HeaderTitle>
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.back()}
        />
      </div>

      {/* Documentation Info */}
      <Card>
        <HeaderTitle>Documentation Details</HeaderTitle>
        <div className="p-6 grid grid-cols-3 gap-4">
          <ValueColumn label="Title" value={documentation?.title || "-"} />
          <ValueColumn
            label="Date"
            value={
              documentation?.date
                ? new Date(documentation.date).toLocaleDateString("id-ID")
                : "-"
            }
          />
          <ValueColumn
            label="Location"
            value={documentation?.location || "-"}
          />
        </div>
      </Card>

      {/* Upload Form */}
      <Card>
        <HeaderTitle>Upload New Image</HeaderTitle>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ReusableUploadZone
              name="file_url"
              control={control}
              accept="image/jpeg,image/jpg,image/png"
            />

            <div className="flex justify-end gap-2 mt-6">
              <ButtonCustom
                label="Cancel"
                color="default"
                onClick={() => reset()}
              />
              <ButtonCustom
                label="Upload"
                type="submit"
                isLoading={isMutating}
              />
            </div>
          </form>
        </div>
      </Card>

      {/* Existing Images */}
      {documentation?.create_tax_volunteer_documentation_file &&
        documentation.create_tax_volunteer_documentation_file.length > 0 && (
          <Card>
            <HeaderTitle>
              Uploaded Images (
              {documentation.create_tax_volunteer_documentation_file.length})
            </HeaderTitle>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {documentation.create_tax_volunteer_documentation_file.map(
                  (file) => (
                    <ImagePreviewWithDelete
                      key={file.id}
                      src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${file.file_url}`}
                      alt={`Image ${file.id}`}
                      caption={`Uploaded on ${new Date(
                        file.created_at
                      ).toLocaleDateString("id-ID")}`}
                      onDelete={() => handleDeleteFile(file.id)}
                      isDeleting={deletingFileId === file.id || isMutating}
                    />
                  )
                )}
              </div>
            </div>
          </Card>
        )}
    </div>
  );
};

export default UploadDocumentationPage;
