"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { Module } from "@/store/ModuleRelawanPajak";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: module,
    isLoading,
    error,
    refetch,
  } = useQuery<Module>(`tax-module/${id}`);
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

  if (!module) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/relawan-pajak/modul")}
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
          <ButtonCustom
            label="Edit"
            to={`/program/relawan-pajak/modul/edit/${id}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-2">
          <Card>
            <HeaderTitle>Detail Module</HeaderTitle>
            <div className="p-8 flex flex-col gap-4">
              <ValueColumn label="Judul" value={module?.title || "-"} />
              <ValueColumn label="Kategori" value={module?.category || "-"} />
              <ValueColumn
                label="Created By"
                value={
                  <CreatorAvatar
                    name={module.created_by?.username}
                    date={formatDate(module.created_at)}
                  />
                }
              />
              <ValueColumn
                label="Updated By"
                value={
                  <CreatorAvatar
                    name={module.updated_by?.username}
                    date={formatDate(module.updated_at)}
                  />
                }
              />
              <ValueColumn
                label="Media"
                value={
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASIC_URL}/${module.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    fontWeight={600}
                  >
                    (View Image)
                  </Link>
                }
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
