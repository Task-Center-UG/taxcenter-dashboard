"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { TaxClinic } from "@/store/TaxClinic";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const formatCategory = (category: string) => {
  const categoryMap: Record<string, string> = {
    CORETAX: "Coretax",
    NPWP_CREATION: "NPWP Creation",
    SPT_FILLING: "SPT Filling",
    E_BILLING_CREATION: "E-Billing Creation",
  };
  return categoryMap[category] || category;
};

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: taxClinic,
    isLoading,
    error,
    refetch,
  } = useQuery<TaxClinic>(`tax-clinic-service/${id}`);
  const { mutate, isMutating } = useMutation();

  // HANDLE DELETE
  const handleDelete = async () => {
    const response = await mutate(`tax-clinic-service/${id}`, "DELETE");
    if (response) {
      console.log("Tax Clinic deleted successfully!");
      router.push("/program/tax-clinic/info-edukasi");
    } else {
      console.error("Failed to delete tax clinic.");
    }
  };

  if (!taxClinic) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/tax-clinic/info-edukasi")}
        />
        <div className="flex gap-4">
          <ButtonCustom
            label="Edit"
            color="warning"
            onClick={() =>
              router.push(`/program/tax-clinic/info-edukasi/edit/${id}`)
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
        <ValueColumn label="Title" value={taxClinic.title} />
        <ValueColumn
          label="Category"
          value={formatCategory(taxClinic.category)}
        />
        {taxClinic.video_url && (
          <ValueColumn
            label="Video URL"
            value={
              <Link
                href={taxClinic.video_url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {taxClinic.video_url}
              </Link>
            }
          />
        )}
        <ValueColumn
          label="Created At"
          value={
            <CreatorAvatar
              name={taxClinic.created_by?.username}
              date={formatDate(taxClinic.created_at)}
            />
          }
        />
        <ValueColumn
          label="Updated At"
          value={
            <CreatorAvatar
              name={taxClinic.updated_by?.username}
              date={formatDate(taxClinic.updated_at)}
            />
          }
        />
      </Card>
    </div>
  );
};

export default page;
