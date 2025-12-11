"use client";

import React from "react";
import { Card } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { useQuery } from "@/hooks/useQuery";
import { Module } from "@/store/ModuleRelawanPajak";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { formatDate } from "@/utils/useFormatter";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import { FileText, Download } from "lucide-react";

const DetailModulPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: module, isLoading } = useQuery<Module>(`tax-module/${id}`);

  const handleDownload = () => {
    if (module?.file_url) {
      const url = `${process.env.NEXT_PUBLIC_BASIC_URL}/${module.file_url}`;
      window.open(url, "_blank");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!module) {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500">Module not found</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.back()}
        />
        <ButtonCustom
          label="Download Module"
          color="success"
          onClick={handleDownload}
        />
      </div>

      {/* Module Details */}
      <Card>
        <HeaderTitle>Module Details</HeaderTitle>
        <div className="p-6 grid grid-cols-2 gap-4">
          <ValueColumn label="Title" value={module.title || "-"} />
          <ValueColumn label="Category" value={module.category || "-"} />
          <div className="col-span-2">
            <ValueColumn
              label="Description"
              value={module.description || "-"}
            />
          </div>
          <ValueColumn
            label="Created By"
            value={
              module.created_by ? (
                <CreatorAvatar
                  name={module.created_by.username}
                  date={formatDate(module.created_at)}
                />
              ) : (
                "-"
              )
            }
          />
          <ValueColumn
            label="Updated By"
            value={
              module.updated_by ? (
                <CreatorAvatar
                  name={module.updated_by.username}
                  date={formatDate(module.updated_at)}
                />
              ) : (
                "-"
              )
            }
          />
        </div>
      </Card>

      {/* File Preview */}
      {module.file_url && (
        <Card>
          <HeaderTitle>Module File</HeaderTitle>
          <div className="p-6">
            <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText size={48} className="text-red-500" />
                <div>
                  <p className="text-lg font-medium">
                    {module.file_url.split("/").pop()}
                  </p>
                  <p className="text-sm text-gray-500">PDF Document</p>
                </div>
              </div>
              <ButtonCustom
                label="Download"
                color="success"
                onClick={handleDownload}
              />
            </div>

            {/* PDF Preview using iframe */}
            <div className="mt-6">
              <iframe
                src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${module.file_url}`}
                className="w-full h-[600px] border border-gray-300 rounded-lg"
                title={module.title}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DetailModulPage;
