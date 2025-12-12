"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { News } from "@/store/News";
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
  const { data: news, isLoading } = useQuery<News>(`news/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`news/${id}`, "DELETE");
    if (result) {
      console.log("News deleted successfully!");
      router.push("/kegiatan/agenda/terbaru");
    } else {
      console.error("Failed to delete news.");
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
            to={`/kegiatan/agenda/terbaru/edit/${id}`}
          />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={news?.title ?? "-"} />
          <ValueColumn label="Description" value={news?.description ?? "-"} />
          <ValueColumn
            label="Created At"
            value={news?.created_at ? formatDate(news.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={news?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={news?.updated_at ? formatDate(news.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={news?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {news?.image_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${news.image_url}`}
              alt={news.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete News"
        message="Are you sure you want to delete this news? This action cannot be undone."
      />
    </div>
  );
};

export default page;
