"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import ButtonWithConfirmation from "@/components/button/ButtonWithConfirmation";
import HeaderTitle from "@/components/card/HeaderTitle";
import ChipStatus from "@/components/chip/ChipStatus";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useMutationWithNotification } from "@/hooks/useMutationWithNotification";
import { useQuery } from "@/hooks/useQuery";
import { useQueryWithPagination } from "@/hooks/useQueryWithPagination";
import { TaxVolunteerMBKMDetail } from "@/store/TaxVolunteer";
import { TaxVolunteerDocumentations } from "@/store/TaxVolunteerDocumentation";
import { getDocumentUrl } from "@/utils/documentUrl";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link, Paper } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import ImagePreviewWithDelete from "@/components/image/ImagePreviewWithDelete";
import { CircularProgress, Pagination } from "@mui/material";

const DetailMBKMPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: volunteer,
    isLoading,
    error,
    refetch,
  } = useQuery<TaxVolunteerMBKMDetail>(`tax-volunteer/mbkm-registration/${id}`);
  const { mutate: updateStatusVolunteer } = useMutationWithNotification();
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);
  console.log(volunteer?.User?.id);

  const additionalParams = React.useMemo(() => {
    if (volunteer?.User?.id) {
      return { user_id: volunteer.User.id };
    }
    return undefined;
  }, [volunteer?.User?.id]);

  const {
    data: documentations,
    isLoading: isLoadingDocs,
    handlePageChange,
    refetch: refetchDocs,
  } = useQueryWithPagination<TaxVolunteerDocumentations>(
    "tax-volunteer-documentation",
    1,
    10,
    additionalParams,
    !!volunteer?.User?.id
  );

  const { mutate: deleteFileMutation } = useMutationWithNotification();

  const handleDeleteFile = async (fileId: number) => {
    setDeletingFileId(fileId);
    const result = await deleteFileMutation(
      `tax-volunteer-documentation-file/${fileId}`,
      "DELETE",
      undefined,
      "File berhasil dihapus"
    );
    if (result) {
      refetchDocs();
    }
    setDeletingFileId(null);
  };

  const handleActiveVolunteer = async () => {
    const result = await updateStatusVolunteer(
      `tax-volunteer/mbkm-registration/${id}`,
      "PUT",
      {
        status: "DITERIMA",
      }
    );
    if (result) {
      refetch();
    } else {
      console.error("Failed to create division.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!volunteer) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/relawan-pajak/pengguna")}
        />
        <div className="flex gap-2">
          {volunteer.status === "PENDING" && (
            <ButtonWithConfirmation
              label="Aktivasi Relawan Pajak"
              onClick={handleActiveVolunteer}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <HeaderTitle>Detail Relawan Pajak MBKM</HeaderTitle>
          <div className="p-8 grid grid-cols-4 gap-4">
            <ValueColumn label="Nama" value={volunteer?.full_name || "-"} />
            <ValueColumn label="NPM" value={volunteer?.npm || "-"} />
            <ValueColumn
              label="Jurusan"
              value={volunteer?.Major?.name || "-"}
            />
            <ValueColumn
              label="Nomor Telepon"
              value={volunteer?.phone_number || "-"}
            />
            <ValueColumn label="Email" value={volunteer?.email || "-"} />
            <ValueColumn
              label="Status"
              value={<ChipStatus label={volunteer?.status.toLowerCase()} />}
            />
            <ValueColumn
              label="Created By"
              value={
                <CreatorAvatar
                  name={volunteer.created_by?.username}
                  date={formatDate(volunteer.created_at)}
                />
              }
            />
            <ValueColumn
              label="Updated By"
              value={
                <CreatorAvatar
                  name={volunteer.updated_by?.username}
                  date={formatDate(volunteer.updated_at)}
                />
              }
            />
          </div>
        </Card>

        <Card>
          <HeaderTitle>Dokumen Pendukung</HeaderTitle>
          <div className="p-8 grid grid-cols-2 gap-4">
            <ValueColumn
              label="KRS (Kartu Rencana Studi)"
              value={
                volunteer?.krs ? (
                  <Link
                    href={getDocumentUrl(volunteer.krs)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Dokumen KRS
                  </Link>
                ) : (
                  "-"
                )
              }
            />
            <ValueColumn
              label="Transkrip Nilai"
              value={
                volunteer?.transcripts ? (
                  <Link
                    href={getDocumentUrl(volunteer.transcripts)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Transkrip Nilai
                  </Link>
                ) : (
                  "-"
                )
              }
            />
          </div>
        </Card>

        <Paper>
          <HeaderTitle>Dokumentasi Relawan Pajak</HeaderTitle>
          <div className="p-4">
            {isLoadingDocs && (
              <Card>
                <div className="flex justify-center items-center min-h-[400px]">
                  <CircularProgress />
                </div>
              </Card>
            )}

            {!isLoadingDocs &&
              (!documentations?.documentations ||
                documentations.documentations.length === 0) && (
                <Card>
                  <div className="p-16 text-center">
                    <p className="text-gray-500">
                      Belum ada dokumentasi untuk relawan pajak ini.
                    </p>
                  </div>
                </Card>
              )}

            {!isLoadingDocs &&
              documentations?.documentations &&
              documentations.documentations.length > 0 && (
                <>
                  <div className="flex flex-col gap-4">
                    {documentations.documentations.map((doc) => (
                      <Card key={doc.id}>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {doc.title}
                              </h3>
                              <div className="text-sm text-gray-500 space-y-0.5">
                                {doc.date && (
                                  <p>
                                    Date:{" "}
                                    {new Date(doc.date).toLocaleDateString(
                                      "id-ID"
                                    )}
                                  </p>
                                )}
                                {doc.location && (
                                  <p>Location: {doc.location}</p>
                                )}
                                {doc.period && <p>Period: {doc.period}</p>}
                                {doc.description && (
                                  <p>Description: {doc.description}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {doc.create_tax_volunteer_documentation_file &&
                          doc.create_tax_volunteer_documentation_file.length >
                            0 ? (
                            <div className="grid grid-cols-2 gap-4">
                              {doc.create_tax_volunteer_documentation_file.map(
                                (file) => (
                                  <ImagePreviewWithDelete
                                    key={file.id}
                                    src={`${process.env.NEXT_PUBLIC_BASIC_URL}/${file.file_url}`}
                                    alt={`Image ${file.id}`}
                                    caption={`Uploaded on ${new Date(
                                      file.created_at
                                    ).toLocaleDateString("id-ID")}`}
                                    onDelete={() => handleDeleteFile(file.id)}
                                    isDeleting={deletingFileId === file.id}
                                  />
                                )
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              Belum ada gambar yang diupload.
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  {documentations?.paging &&
                    documentations.paging.total_pages > 1 && (
                      <div className="flex justify-center mt-4">
                        <Pagination
                          count={documentations.paging.total_pages}
                          page={documentations.paging.page}
                          onChange={(e, page) => handlePageChange(page)}
                          color="primary"
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    )}
                </>
              )}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default DetailMBKMPage;
