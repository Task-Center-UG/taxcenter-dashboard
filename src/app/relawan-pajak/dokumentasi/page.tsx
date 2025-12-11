"use client";

import React, { useState } from "react";
import { Card, CircularProgress, Pagination } from "@mui/material";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ImagePreviewWithDelete from "@/components/image/ImagePreviewWithDelete";
import { useTaxVolunteerDocumentation } from "@/hooks/useTaxVolunteerDocumentation";
import { Plus } from "lucide-react";

const DokumentasiPage = () => {
  const { data, isLoading, isMutating, handlePageChange, refetch, deleteFile } =
    useTaxVolunteerDocumentation();

  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

  const handleDeleteFile = async (fileId: number) => {
    setDeletingFileId(fileId);
    const result = await deleteFile(fileId);
    if (result) {
      refetch();
    }
    setDeletingFileId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <HeaderTitle>Dokumentasi Tax Volunteer</HeaderTitle>
        <ButtonCustom
          label="Add New"
          icon={<Plus size={18} />}
          to="/relawan-pajak/dokumentasi/create"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <CircularProgress />
        </div>
      )}

      {/* Empty State */}
      {!isLoading &&
        (!data?.documentations || data.documentations.length === 0) && (
          <Card>
            <div className="p-16 text-center">
              <p className="text-gray-500">
                No documentation found. Click "Add New" to create one.
              </p>
            </div>
          </Card>
        )}

      {/* Documentation List */}
      {!isLoading && data?.documentations && data.documentations.length > 0 && (
        <>
          {data.documentations.map((doc) => (
            <Card key={doc.id}>
              <div className="p-6">
                {/* Documentation Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{doc.title}</h3>
                    <div className="text-sm text-gray-500 space-y-0.5">
                      {doc.date && (
                        <p>
                          Date: {new Date(doc.date).toLocaleDateString("id-ID")}
                        </p>
                      )}
                      {doc.location && <p>Location: {doc.location}</p>}
                      <p>By: {doc.User.full_name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <ButtonCustom
                      label="View"
                      size="small"
                      color="info"
                      to={`/relawan-pajak/dokumentasi/detail/${doc.id}`}
                    />
                    <ButtonCustom
                      label="Edit"
                      size="small"
                      to={`/relawan-pajak/dokumentasi/edit/${doc.id}`}
                    />
                    <ButtonCustom
                      label="Upload"
                      size="small"
                      color="success"
                      to={`/relawan-pajak/dokumentasi/upload/${doc.id}`}
                    />
                  </div>
                </div>

                {/* Images Grid */}
                {doc.create_tax_volunteer_documentation_file &&
                doc.create_tax_volunteer_documentation_file.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {doc.create_tax_volunteer_documentation_file.map((file) => (
                      <ImagePreviewWithDelete
                        key={file.id}
                        src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${file.file_url}`}
                        alt={`Image ${file.id}`}
                        caption={`Uploaded on ${new Date(
                          file.created_at
                        ).toLocaleDateString("id-ID")}`}
                        onDelete={() => handleDeleteFile(file.id)}
                        isDeleting={deletingFileId === file.id || isMutating}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No images uploaded yet. Click "Upload" to add images.
                  </div>
                )}
              </div>
            </Card>
          ))}

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

export default DokumentasiPage;
