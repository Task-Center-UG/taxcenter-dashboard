"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { Slider } from "@/store/Slider";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Sliders } from "../page";
import Loader from "@/components/loading/Loader";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import { formatDate } from "@/utils/useFormatter";
import ImagePreview from "@/components/image/ImagePreview";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: sliders,
    isLoading,
    error,
  } = useQuery<Sliders>(`/sliders/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(
      `/sliders/${id}`,
      "DELETE",
      undefined,
      "Hero slider berhasil dihapus"
    );
    if (result) {
      console.log("Hero slider deleted successfully!");
      router.push("/beranda/hero-slider");
    } else {
      console.error("Failed to delete hero slider.");
    }
  };

  if (!sliders) {
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
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={sliders?.title ?? "-"} />
          <ValueColumn
            label="Created By"
            value={
              <CreatorAvatar
                name={sliders.created_by?.username ?? "-"}
                date={formatDate(sliders.created_at)}
              />
            }
          />
          <ValueColumn
            label="Updated By"
            value={
              <CreatorAvatar
                name={sliders.updated_by?.username ?? "-"}
                date={formatDate(sliders.updated_at)}
              />
            }
          />
        </div>
      </Card>

      <Card>
        <HeaderTitle>Media</HeaderTitle>
        <div className="p-8 flex flex-col gap-4">
          <ImagePreview
            src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${sliders?.picture_url}`}
            alt="A person standing in a desert canyon."
            width={1280}
            height={720}
          />
        </div>
      </Card>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Hero Slider"
        message="Apakah Anda yakin ingin menghapus hero slider ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default page;
