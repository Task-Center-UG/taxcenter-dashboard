"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { AfternoonTalk } from "@/store/AfternoonTalk";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";
import Loader from "@/components/loading/Loader";
import ImagePreview from "@/components/image/ImagePreview";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: podcast, isLoading } = useQuery<AfternoonTalk>(
    `afternoon-talk/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`afternoon-talk/${id}`, "DELETE");
    if (result) {
      console.log("Podcast deleted successfully!");
      router.push("/edukasi/podcast");
    } else {
      console.error("Failed to delete podcast.");
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
          <ButtonCustom label="Edit" to={`/edukasi/podcast/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={podcast?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={podcast?.description ?? "-"}
          />
          <ValueColumn
            label="Video URL"
            value={
              podcast?.video_url ? (
                <Link href={podcast.video_url} target="_blank" rel="noopener">
                  View Video
                </Link>
              ) : (
                "-"
              )
            }
          />
          <ValueColumn
            label="Created At"
            value={podcast?.created_at ? formatDate(podcast.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={podcast?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={podcast?.updated_at ? formatDate(podcast.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={podcast?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {podcast?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${podcast.image_url}`}
              alt={podcast.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Podcast"
        message="Are you sure you want to delete this podcast? This action cannot be undone."
      />
    </div>
  );
};

export default page;
