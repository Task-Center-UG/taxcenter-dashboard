"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { ResearchCategory } from "@/store/ResearchCategory";
import { formatDate } from "@/utils/useFormatter";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: researchCategory,
    isLoading,
    error,
    refetch,
  } = useQuery<ResearchCategory>(`research-category/${id}`);
  const { mutate, isMutating } = useMutationWithNotification();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(`research-category/${id}`, "DELETE");
    if (response) {
      console.log("Research Category deleted successfully!");
      router.push("/program/riset/kategori");
    } else {
      console.error("Failed to delete research category.");
    }
  };

  if (!researchCategory) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/riset/kategori")}
        />
        <div className="flex gap-4">
          <ButtonCustom
            label="Edit"
            color="warning"
            onClick={() => router.push(`/program/riset/kategori/edit/${id}`)}
          />
          <ButtonCustom
            label="Delete"
            color="error"
            onClick={handleDelete}
            isDisabled={isMutating}
          />
        </div>
      </div>
      <Card className="p-8 flex flex-col gap-4">
        <HeaderTitle>Detail</HeaderTitle>
        <ValueColumn label="Title" value={researchCategory.title} />
        <ValueColumn
          label="Created At"
          value={
            <CreatorAvatar
              name={researchCategory.created_by?.username}
              date={formatDate(researchCategory.created_at)}
            />
          }
        />
        <ValueColumn
          label="Updated At"
          value={
            <CreatorAvatar
              name={researchCategory.updated_by?.username}
              date={formatDate(researchCategory.updated_at)}
            />
          }
        />
      </Card>
    </div>
  );
};

export default page;
