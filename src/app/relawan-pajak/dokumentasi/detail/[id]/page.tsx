"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { useTaxVolunteerDocumentation } from "@/hooks/useTaxVolunteerDocumentation";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerDocumentation } from "@/store/TaxVolunteerDocumentation";
import Loader from "@/components/loading/Loader";
import ImagePreviewWithDelete from "@/components/image/ImagePreviewWithDelete";
import { ValueColumn } from "@/components/value/ValueColumn";
import { formatDate } from "@/utils/useFormatter";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";

const DetailDocumentationPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { deleteDocumentation, deleteFile, isMutating } =
    useTaxVolunteerDocumentation();

  const {
    data: documentation,
    isLoading,
    refetch,
  } = useQuery<TaxVolunteerDocumentation>(`tax-volunteer-documentation/${id}`);

  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

  const handleDelete = async () => {
    const result = await deleteDocumentation(Number(id));
    if (result) {
      router.push("/relawan-pajak/dokumentasi");
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

  if (!documentation) {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500">Documentation not found</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.back()}
        />
        <div className="flex gap-2">
          <ButtonCustom
            label="Delete Documentation"
            color="error"
            withConfirmation={{
              title: "Delete this documentation?",
              message:
                "Are you sure you want to delete this documentation? All uploaded images will also be deleted.",
              confirmColor: "error",
              confirmText: "Delete",
            }}
            onClick={handleDelete}
            isLoading={isMutating}
          />
          <ButtonCustom
            label="Edit"
            to={`/relawan-pajak/dokumentasi/edit/${id}`}
          />
          <ButtonCustom
            label="Upload Images"
            color="success"
            to={`/relawan-pajak/dokumentasi/upload/${id}`}
          />
        </div>
      </div>

      {/* Documentation Details */}
      <Card>
        <HeaderTitle>Documentation Details</HeaderTitle>
        <div className="p-6 grid grid-cols-3 gap-4">
          <ValueColumn label="Title" value={documentation.title || "-"} />
          <ValueColumn
            label="Date"
            value={
              documentation.date
                ? new Date(documentation.date).toLocaleDateString("id-ID")
                : "-"
            }
          />
          <ValueColumn label="Location" value={documentation.location || "-"} />
          <ValueColumn
            label="Created By"
            value={
              documentation.User ? (
                <CreatorAvatar
                  name={documentation.User.full_name}
                  date={formatDate(documentation.created_at)}
                />
              ) : (
                "-"
              )
            }
          />
          <ValueColumn
            label="Updated At"
            value={formatDate(documentation.updated_at)}
          />
          <ValueColumn
            label="Total Images"
            value={
              documentation.create_tax_volunteer_documentation_file?.length || 0
            }
          />
        </div>
      </Card>

      {/* Images Gallery */}
      {documentation.create_tax_volunteer_documentation_file &&
      documentation.create_tax_volunteer_documentation_file.length > 0 ? (
        <Card>
          <HeaderTitle>
            Images (
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
      ) : (
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500 mb-4">
              No images uploaded yet. Click "Upload Images" to add images.
            </p>
            <ButtonCustom
              label="Upload Images"
              color="success"
              to={`/relawan-pajak/dokumentasi/upload/${id}`}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default DetailDocumentationPage;
