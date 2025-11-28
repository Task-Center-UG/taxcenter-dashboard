"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { UmkmProductPhoto } from "@/store/UmkmProductPhoto";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: umkmPhoto, isLoading } = useQuery<UmkmProductPhoto>(
    `umkm-product-photo/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`umkm-product-photo/${id}`, "DELETE");
    if (result) {
      console.log("UMKM Product Photo deleted successfully!");
      router.push("/program/pengabdian/foto-produk-umkm");
    } else {
      console.error("Failed to delete UMKM Product Photo.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => window.history.back()}
        />
        <div className="flex gap-4">
          <ButtonCustom
            label="Delete"
            color="error"
            onClick={() => setOpenDialog(true)}
            isLoading={isMutating}
          />
          <ButtonCustom
            label="Edit"
            to={`/program/pengabdian/foto-produk-umkm/edit/${id}`}
          />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={umkmPhoto?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={umkmPhoto?.description ?? "-"}
          />
          <ValueColumn
            label="Created At"
            value={
              umkmPhoto?.created_at ? formatDate(umkmPhoto.created_at) : "-"
            }
          />
          <ValueColumn
            label="Created By"
            value={umkmPhoto?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={
              umkmPhoto?.updated_at ? formatDate(umkmPhoto.updated_at) : "-"
            }
          />
          <ValueColumn
            label="Updated By"
            value={umkmPhoto?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {umkmPhoto?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${umkmPhoto.image_url}`}
              alt={umkmPhoto.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete UMKM Product Photo"
        message="Are you sure you want to delete this UMKM product photo? This action cannot be undone."
      />
    </div>
  );
};

export default page;
