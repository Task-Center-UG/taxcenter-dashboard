"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { Gallery } from "@/store/Gallery";
import { formatDate } from "@/utils/useFormatter";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: gallery,
    isLoading,
    error,
    refetch,
  } = useQuery<Gallery>(`gallery/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(
      `gallery/${id}`,
      "DELETE",
      undefined,
      "Gallery deleted successfully!"
    );
    if (response) {
      router.push("/galeri/foto-kegiatan");
    }
  };

  if (!gallery) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/galeri/foto-kegiatan")}
        />
        <div className="flex gap-4">
          <ButtonCustom
            label="Delete"
            color="error"
            withConfirmation={{
              title: "Delete this record?",
              message: "Are you sure you want to delete this record?",
              confirmColor: "error",
              confirmText: "Delete",
            }}
            onClick={handleDelete}
          />
          <ButtonCustom label="Edit" to={`/galeri/foto-kegiatan/edit/${id}`} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div>
          <Card>
            <HeaderTitle>Detail</HeaderTitle>
            <div className="p-8 flex flex-col gap-4">
              <ValueColumn label="Judul" value={gallery?.title || "-"} />
              <ValueColumn
                label="Deskripsi"
                value={gallery?.description || "-"}
              />
              <ValueColumn
                label="Created By"
                value={
                  <CreatorAvatar
                    name={gallery.created_by?.username}
                    date={formatDate(gallery.created_at)}
                  />
                }
              />
              <ValueColumn
                label="Updated By"
                value={
                  <CreatorAvatar
                    name={gallery.updated_by?.username}
                    date={formatDate(gallery.updated_at)}
                  />
                }
              />
            </div>
          </Card>
        </div>

        <Card className="col-span-3">
          <HeaderTitle>Media</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ImagePreview
              src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${gallery?.picture_url}`}
              alt="A person standing in a desert canyon."
              width={1280}
              height={720}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
