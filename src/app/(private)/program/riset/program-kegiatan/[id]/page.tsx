"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { Research } from "@/store/Research";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: research,
    isLoading,
    error,
    refetch,
  } = useQuery<Research>(`research/${id}`);
  const { mutate, isMutating } = useMutation();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(`research/${id}`, "DELETE");
    if (response) {
      console.log("Research program deleted successfully!");
      router.push("/program/riset/program-kegiatan");
    } else {
      console.error("Failed to delete research program.");
    }
  };

  if (!research) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/riset/program-kegiatan")}
        />
        <div className="flex gap-4">
          <ButtonCustom
            label="Edit"
            color="warning"
            onClick={() =>
              router.push(`/program/riset/program-kegiatan/edit/${id}`)
            }
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
        <ValueColumn label="Title" value={research.title} />
        <ValueColumn label="Description" value={research.description} />
        <ValueColumn
          label="Research Category"
          value={research.researchCategory?.title || "-"}
        />
        {research.cta_url && (
          <ValueColumn
            label="CTA URL"
            value={
              <Link
                href={research.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {research.cta_url}
              </Link>
            }
          />
        )}
        <ValueColumn
          label="Created At"
          value={
            <CreatorAvatar
              name={research.created_by?.username}
              date={formatDate(research.created_at)}
            />
          }
        />
        <ValueColumn
          label="Updated At"
          value={
            <CreatorAvatar
              name={research.updated_by?.username}
              date={formatDate(research.updated_at)}
            />
          }
        />
      </Card>
    </div>
  );
};

export default page;
