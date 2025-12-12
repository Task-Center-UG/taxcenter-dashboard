"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreview from "@/components/image/ImagePreview";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { DivisionAssistant } from "@/store/DivisionAssistant";
import { formatDate } from "@/utils/useFormatter";
import { Card, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: divisionAssistant,
    isLoading,
    error,
    refetch,
  } = useQuery<DivisionAssistant>(`division-assistants/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(`division-assistants/${id}`, "DELETE");
    if (response) {
      console.log("Division Assistant deleted successfully!");
      router.push("/tentang-kami/anggota");
    } else {
      console.error("Failed to delete divission assistant.");
    }
  };

  if (!divisionAssistant) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/tentang-kami/anggota")}
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
          <ButtonCustom label="Edit" to={`/tentang-kami/anggota/edit/${id}`} />
        </div>
      </div>

      <div className="">
        <div>
          <Card>
            <HeaderTitle>Detail Assisten</HeaderTitle>
            <div className="p-8 grid grid-cols-3 gap-8">
              <ValueColumn
                label="Nama"
                value={divisionAssistant?.name || "-"}
              />
              <ValueColumn
                label="Jurusan"
                value={divisionAssistant?.Major?.name || "-"}
              />
              <ValueColumn
                label="Divisi"
                value={divisionAssistant?.Division?.name || "-"}
              />
              <ValueColumn
                label="Created By"
                value={
                  <CreatorAvatar
                    name={divisionAssistant.created_by?.username}
                    date={formatDate(divisionAssistant.created_at)}
                  />
                }
              />
              <ValueColumn
                label="Updated By"
                value={
                  <CreatorAvatar
                    name={divisionAssistant.updated_by?.username}
                    date={formatDate(divisionAssistant.updated_at)}
                  />
                }
              />
              <div className="flex flex-col gap-2">
                <ValueColumn label="Foto" value="" />
                <ImagePreview
                  src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${divisionAssistant?.picture_url}`}
                  alt="A person standing in a desert canyon."
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
