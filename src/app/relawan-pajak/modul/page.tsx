"use client";

import React from "react";
import { Card, CircularProgress, Pagination, Chip } from "@mui/material";
import HeaderTitle from "@/components/card/HeaderTitle";
import ButtonCustom from "@/components/button/ButtonCustom";
import { useTaxModule } from "@/hooks/useTaxModule";
import { FileText, Download } from "lucide-react";

const ModulPage = () => {
  const { data, isLoading, handlePageChange } = useTaxModule();

  const handleDownload = (fileUrl: string, title: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASIC_URL}/${fileUrl}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <HeaderTitle>Modul Pembelajaran</HeaderTitle>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <CircularProgress />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!data?.taxModules || data.taxModules.length === 0) && (
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500">No modules available yet.</p>
          </div>
        </Card>
      )}

      {/* Module List */}
      {!isLoading && data?.taxModules && data.taxModules.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            {data.taxModules.map((module) => (
              <Card key={module.id}>
                <div className="p-6">
                  {/* Module Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText size={24} className="text-primary" />
                        <h3 className="text-xl font-semibold">
                          {module.title}
                        </h3>
                      </div>
                      {module.category && (
                        <Chip
                          label={module.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                          className="mb-2"
                        />
                      )}
                      {module.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {module.description}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        <p>
                          Created by: {module.created_by?.username || "-"} •{" "}
                          {new Date(module.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ButtonCustom
                        label="View"
                        size="small"
                        color="info"
                        to={`/relawan-pajak/modul/detail/${module.id}`}
                      />
                      <ButtonCustom
                        label="Download"
                        size="small"
                        color="success"
                        onClick={() =>
                          handleDownload(module.file_url, module.title)
                        }
                      />
                    </div>
                  </div>

                  {/* File Preview - PDF Icon */}
                  {module.file_url && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <FileText size={40} className="text-red-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {module.file_url.split("/").pop()}
                          </p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {data?.paging && data.paging.total_pages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={data.paging.total_pages}
                page={data.paging.page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModulPage;
