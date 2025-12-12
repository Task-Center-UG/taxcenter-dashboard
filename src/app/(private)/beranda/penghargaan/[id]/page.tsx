"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { Award } from "@/store/Award";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Loader from "@/components/loading/Loader";
import ImagePreview from "@/components/image/ImagePreview";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: award, isLoading, error } = useQuery<Award>(`/awards/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(
      `/awards/${id}`,
      "DELETE",
      undefined,
      "Penghargaan berhasil dihapus"
    );
    if (result) {
      console.log("Award deleted successfully!");
      router.push("/beranda/penghargaan");
    } else {
      console.error("Failed to delete award.");
    }
  };

  if (!award) {
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
          <ValueColumn label="Title" value={award?.title ?? "-"} />
        </div>
      </Card>

      <Card>
        <HeaderTitle>Media</HeaderTitle>
        <div className="p-8 flex flex-col gap-4">
          <ImagePreview
            src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${award?.picture_url}`}
            alt={award?.title ?? "Award image"}
            width={1280}
            height={720}
          />
        </div>
      </Card>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Penghargaan"
        message="Apakah Anda yakin ingin menghapus penghargaan ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default page;
