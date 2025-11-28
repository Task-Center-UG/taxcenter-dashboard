"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { Article } from "@/store/Article";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";
import ImagePreview from "@/components/image/ImagePreview";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: article, isLoading } = useQuery<Article>(`article/${id}`);
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`article/${id}`, "DELETE");
    if (result) {
      console.log("Article deleted successfully!");
      router.push("/kegiatan/artikel");
    } else {
      console.error("Failed to delete article.");
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
          <ButtonCustom label="Edit" to={`/kegiatan/artikel/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={article?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={article?.description ?? "-"}
          />
          <ValueColumn
            label="Created At"
            value={article?.created_at ? formatDate(article.created_at) : "-"}
          />
          <ValueColumn
            label="Created By"
            value={article?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={article?.updated_at ? formatDate(article.updated_at) : "-"}
          />
          <ValueColumn
            label="Updated By"
            value={article?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      {article?.picture_url && (
        <Card>
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${article.picture_url}`}
              alt={article.title}
            />
          </div>
        </Card>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
};

export default page;
