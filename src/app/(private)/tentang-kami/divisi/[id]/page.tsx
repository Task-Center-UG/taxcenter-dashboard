"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { Division } from "@/store/Division";
import { formatDate } from "@/utils/useFormatter";
import { Card, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: division,
    isLoading,
    error,
    refetch,
  } = useQuery<Division>(`divisions/${id}`);
  const { mutate, isMutating } = useMutation();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(`divisions/${id}`, "DELETE");
    if (response) {
      console.log("Division deleted successfully!");
      router.push("/tentang-kami/divisi");
    } else {
      console.error("Failed to delete divission.");
    }
  };

  if (!division) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/tentang-kami/divisi")}
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
          <ButtonCustom label="Edit" to={`/tentang-kami/divisi/edit/${id}`} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div>
          <Card>
            <HeaderTitle>Detail Divisi</HeaderTitle>
            <div className="p-8 flex flex-col gap-4">
              <ValueColumn label="Judul" value={division?.name || "-"} />
              <ValueColumn
                label="Deskripsi"
                value={division?.description || "-"}
              />
              <ValueColumn
                label="Created By"
                value={
                  <CreatorAvatar
                    name={division.created_by?.username}
                    date={formatDate(division.created_at)}
                  />
                }
              />
              <ValueColumn
                label="Updated By"
                value={
                  <CreatorAvatar
                    name={division.updated_by?.username}
                    date={formatDate(division.updated_at)}
                  />
                }
              />
              <ValueColumn label="Media" value="" />
              <ImagePreview
                src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${division?.picture_url}`}
                alt="A person standing in a desert canyon."
                width={1280}
                height={720}
              />
            </div>
          </Card>
        </div>

        <Card className="col-span-3">
          <HeaderTitle>List Anggota</HeaderTitle>
          <div className="p-8 flex flex-col gap-4"></div>
        </Card>
      </div>
    </div>
  );
};

export default page;
