"use client";

import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import ChipStatus from "@/components/chip/ChipStatus";
import Loader from "@/components/loading/Loader";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import {
  TaxVolunteerNonMBKM,
  TaxVolunteerNonMBKMDetail,
} from "@/store/TaxVolunteer";
import { getDocumentUrl } from "@/utils/documentUrl";
import { formatDate } from "@/utils/useFormatter";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const DetailNonMBKMPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: volunteer,
    isLoading,
    error,
  } = useQuery<TaxVolunteerNonMBKMDetail>(
    `tax-volunteer/non-mbkm-registration/${id}`
  );

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
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <HeaderTitle>Detail Relawan Pajak Non MBKM</HeaderTitle>
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
              value={<ChipStatus label={volunteer?.status} />}
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
      </div>
    </div>
  );
};

export default DetailNonMBKMPage;
