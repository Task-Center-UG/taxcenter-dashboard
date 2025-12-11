"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { Fgd } from "@/store/Fgd";
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
  const { data: fgd, isLoading } = useQuery<Fgd>(`fgd/${id}`);
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`fgd/${id}`, "DELETE");
    if (result) {
      console.log("FGD deleted successfully!");
      router.push("/program/pengabdian/pendampingan-umkm");
    } else {
      console.error("Failed to delete FGD.");
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
            to={`/program/pengabdian/pendampingan-umkm/edit/${id}`}
          />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={fgd?.title ?? "-"} />
          <ValueColumn label="Description" value={fgd?.description ?? "-"} />
          <ValueColumn
            label="Created At"
            value={fgd?.created_at ? formatDate(fgd.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={fgd?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={fgd?.updated_at ? formatDate(fgd.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={fgd?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {fgd?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${fgd.image_url}`}
              alt={fgd.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete FGD"
        message="Are you sure you want to delete this FGD? This action cannot be undone."
      />
    </div>
  );
};

export default page;
