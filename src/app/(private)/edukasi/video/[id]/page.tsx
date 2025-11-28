"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { TaxLearningVideo } from "@/store/TaxLearningVideo";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: video, isLoading } = useQuery<TaxLearningVideo>(
    `tax-learning-video/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`tax-learning-video/${id}`, "DELETE");
    if (result) {
      console.log("Tax Learning Video deleted successfully!");
      router.push("/edukasi/video");
    } else {
      console.error("Failed to delete tax learning video.");
    }
  };

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
          <ButtonCustom label="Edit" to={`/edukasi/video/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={video?.title ?? "-"} />
          <ValueColumn label="Description" value={video?.description ?? "-"} />
          <ValueColumn
            label="Video URL"
            value={
              video?.video_url ? (
                <Link href={video.video_url} target="_blank" rel="noopener">
                  Watch Video
                </Link>
              ) : (
                "-"
              )
            }
          />
          <ValueColumn
            label="Created At"
            value={video?.created_at ? formatDate(video.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={video?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={video?.updated_at ? formatDate(video.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={video?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Tax Learning Video"
        message="Are you sure you want to delete this tax learning video? This action cannot be undone."
      />
    </div>
  );
};

export default page;
