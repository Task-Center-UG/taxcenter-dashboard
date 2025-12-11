"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";
import ReusableTable from "@/components/table/ReusableTable";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { Division } from "@/store/Division";
import { DivisionAssistants } from "@/store/DivisionAssistant";
import { formatDate } from "@/utils/useFormatter";
import { Card, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns } from "../../anggota/data";

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
  const { data: assistant, isLoading: loadingAssistant } =
    useQuery<DivisionAssistants>(`division-assistants?division_id=${id}`);
  const { data: media, isLoading: loadingMedia } = useQuery<any>(
    `activity-divisions?division_id=${id}`
  );

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
          <ButtonCustom
            label="Tambah Foto Kegiatan"
            to={`/tentang-kami/divisi/${id}/kegiatan/create`}
          />
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

        <div className="col-span-3 flex flex-col gap-8">
          <Card>
            <HeaderTitle>List Anggota</HeaderTitle>
            <div className="p-8 flex flex-col gap-4">
              <ReusableTable
                columns={columns}
                data={assistant?.divisionAssistants ?? []}
                isLoading={isLoading}
              />
            </div>
          </Card>
          <Card>
            <HeaderTitle>List Foto Kegiatan</HeaderTitle>
            {loadingMedia ? (
              <Loader />
            ) : (
              <div className="p-8 grid grid-cols-3 gap-8">
                {media?.activityDivisons.map((media: any) => (
                  <ImagePreview
                    src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${media?.picture_url}`}
                    alt="A person standing in a desert canyon."
                    width={1280}
                    height={720}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
