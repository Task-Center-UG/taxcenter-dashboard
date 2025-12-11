"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { Training } from "@/store/Training";
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
  const { data: training, isLoading } = useQuery<Training>(`training/${id}`);
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`training/${id}`, "DELETE");
    if (result) {
      console.log("Training deleted successfully!");
      router.push("/program/pengabdian/pelatihan-umkm");
    } else {
      console.error("Failed to delete training.");
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
            to={`/program/pengabdian/pelatihan-umkm/edit/${id}`}
          />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={training?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={training?.description ?? "-"}
          />
          <ValueColumn
            label="Created At"
            value={training?.created_at ? formatDate(training.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={training?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={training?.updated_at ? formatDate(training.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={training?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {training?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${training.image_url}`}
              alt={training.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Training"
        message="Are you sure you want to delete this training? This action cannot be undone."
      />
    </div>
  );
};

export default page;
