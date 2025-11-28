"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { Publication } from "@/store/Publication";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import ConfirmationDialog from "@/components/confirmation/ConfirmationDialog";
import Loader from "@/components/loading/Loader";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: publication, isLoading } = useQuery<Publication>(
    `publication/${id}`
  );
  const { mutate, isMutating } = useMutation();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    const result = await mutate(`publication/${id}`, "DELETE");
    if (result) {
      console.log("Publication deleted successfully!");
      router.push("/kegiatan/publikasi");
    } else {
      console.error("Failed to delete publication.");
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
          <ButtonCustom label="Edit" to={`/kegiatan/publikasi/edit/${id}`} />
        </div>
      </div>

      <Card>
        <HeaderTitle>Detail</HeaderTitle>
        <div className="p-8 grid grid-cols-4 gap-4">
          <ValueColumn label="Title" value={publication?.title ?? "-"} />
          <ValueColumn
            label="Description"
            value={publication?.description ?? "-"}
          />
          <ValueColumn
            label="Year"
            value={publication?.year?.toString() ?? "-"}
          />
          <ValueColumn
            label="Created At"
            value={
              publication?.created_at ? formatDate(publication.created_at) : "-"
            }
          />
          <ValueColumn
            label="Created By"
            value={publication?.created_by?.username ?? "-"}
          />
          <ValueColumn
            label="Updated At"
            value={
              publication?.updated_at ? formatDate(publication.updated_at) : "-"
            }
          />
          <ValueColumn
            label="Updated By"
            value={publication?.updated_by?.username ?? "-"}
          />
        </div>
      </Card>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Delete Publication"
        message="Are you sure you want to delete this publication? This action cannot be undone."
      />
    </div>
  );
};

export default page;
