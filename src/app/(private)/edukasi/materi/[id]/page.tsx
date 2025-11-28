"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { TaxMaterial } from "@/store/TaxMaterial";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: taxMaterial, isLoading } = useQuery<TaxMaterial>(
    `tax-material/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`tax-material/${id}`, "DELETE");
    if (result) {
      console.log("Tax Material deleted successfully!");
      router.push("/edukasi/materi");
    } else {
      console.error("Failed to delete tax material.");
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
          <ButtonCustom label="Edit" to={`/edukasi/materi/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={taxMaterial?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={taxMaterial?.description ?? "-"}
          />
          <ValueColumn
            label="File URL"
            value={
              taxMaterial?.file_url ? (
                <Link
                  href={taxMaterial.file_url}
                  target="_blank"
                  rel="noopener"
                >
                  View File
                </Link>
              ) : (
                "-"
              )
            }
          />
          <ValueColumn
            label="Created At"
            value={
              taxMaterial?.created_at ? formatDate(taxMaterial.created_at) : "-"
            }
          />
          <ValueColumn
            label="Created By"
            value={taxMaterial?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={
              taxMaterial?.updated_at ? formatDate(taxMaterial.updated_at) : "-"
            }
          />
          <ValueColumn
            label="Updated By"
            value={taxMaterial?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {taxMaterial?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${taxMaterial.image_url}`}
              alt={taxMaterial.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Tax Material"
        message="Are you sure you want to delete this tax material? This action cannot be undone."
      />
    </div>
  );
};

export default page;
