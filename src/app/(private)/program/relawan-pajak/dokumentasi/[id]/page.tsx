"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerDocumentation } from "@/store/TaxVolunteerDocumentation";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link, List, ListItem, ListItemText } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const DetailDokumentasiPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: documentation,
    isLoading,
    error,
  } = useQuery<TaxVolunteerDocumentation>(`tax-volunteer-documentation/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  if (!documentation) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Back"
          color="default"
          onClick={() => router.push("/program/relawan-pajak/dokumentasi")}
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <HeaderTitle>Detail Dokumentasi Relawan Pajak</HeaderTitle>
          <div className="p-8 flex flex-col gap-4">
            <ValueColumn label="Judul" value={documentation?.title || "-"} />
            <ValueColumn
              label="Deskripsi"
              value={documentation?.description || "-"}
            />
            <ValueColumn label="Periode" value={documentation?.period || "-"} />
            <ValueColumn
              label="Created By"
              value={
                <CreatorAvatar
                  name={documentation.created_by?.username}
                  date={formatDate(documentation.created_at)}
                />
              }
            />
            <ValueColumn
              label="Updated By"
              value={
                <CreatorAvatar
                  name={documentation.updated_by?.username}
                  date={formatDate(documentation.updated_at)}
                />
              }
            />
          </div>
        </Card>

        {documentation.files && documentation.files.length > 0 && (
          <Card>
            <HeaderTitle>File Dokumentasi</HeaderTitle>
            <div className="p-8">
              <List>
                {documentation.files.map((file, index) => (
                  <ListItem key={file.id}>
                    <ListItemText
                      primary={
                        <Link
                          href={`${process.env.NEXT_PUBLIC_BASIC_URL}/${file.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.file_name}
                        </Link>
                      }
                      secondary={`Uploaded at: ${formatDate(file.created_at)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailDokumentasiPage;
