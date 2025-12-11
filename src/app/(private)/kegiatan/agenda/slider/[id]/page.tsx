"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { AgendaSlider } from "@/store/AgendaSlider";
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
  const { data: agendaSlider, isLoading } = useQuery<AgendaSlider>(
    `activity-agenda-image-slider/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`activity-agenda-image-slider/${id}`, "DELETE");
    if (result) {
      console.log("Agenda Slider deleted successfully!");
      router.push("/kegiatan/agenda/slider");
    } else {
      console.error("Failed to delete agenda slider.");
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
            to={`/kegiatan/agenda/slider/edit/${id}`}
          />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn
            label="Created At"
            value={
              agendaSlider?.created_at
                ? formatDate(agendaSlider.created_at)
                : "-"
            }
          />
          <ValueColumn
            label="Created By"
            value={agendaSlider?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={
              agendaSlider?.updated_at
                ? formatDate(agendaSlider.updated_at)
                : "-"
            }
          />
          <ValueColumn
            label="Updated By"
            value={agendaSlider?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {agendaSlider?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${agendaSlider.image_url}`}
              alt="Agenda Slider"
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Agenda Slider"
        message="Are you sure you want to delete this agenda slider? This action cannot be undone."
      />
    </div>
  );
};

export default page;
