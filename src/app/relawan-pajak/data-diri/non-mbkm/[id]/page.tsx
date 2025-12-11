"use client";

import ButtonCustom from "@/components/button/ButtonCustom";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { useQuery } from "@/hooks/useQuery";
import { TaxVolunteerNonMBKMDetail } from "@/store/TaxVolunteer";
import { Card, Link } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/useFormatter";
import Loader from "@/components/loading/Loader";
import { getDocumentUrl } from "@/utils/documentUrl";
import ChipStatus from "@/components/chip/ChipStatus";

const TaxVolunteerNonMBKMDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: volunteer, isLoading } = useQuery<TaxVolunteerNonMBKMDetail>(
    `tax-volunteer/non-mbkm/${id}`
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ButtonCustom
          label="Kembali"
          color="default"
          onClick={() => router.back()}
        />
      </div>

      <Card>
        <HeaderTitle>Detail Data Relawan Pajak Non-MBKM</HeaderTitle>
        <div className="p-8 grid grid-cols-3 gap-4">
          <ValueColumn
            label="Nama Lengkap"
            value={volunteer?.full_name ?? "-"}
          />
          <ValueColumn label="NPM" value={volunteer?.npm ?? "-"} />
          <ValueColumn label="Kelas" value={volunteer?.class ?? "-"} />

          <ValueColumn label="Jurusan" value={volunteer?.Major?.name ?? "-"} />
          <ValueColumn label="Wilayah" value={volunteer?.Region?.name ?? "-"} />
          <ValueColumn label="IPK" value={volunteer?.ipk?.toString() ?? "-"} />

          <ValueColumn label="Alamat" value={volunteer?.address ?? "-"} />
          <ValueColumn
            label="No. Telepon"
            value={volunteer?.phone_number ?? "-"}
          />
          <ValueColumn label="Email" value={volunteer?.email ?? "-"} />

          <ValueColumn
            label="Kegiatan Relawan Pajak"
            value={volunteer?.tax_volunteer_activities ?? "-"}
          />
          <ValueColumn
            label="Sudah Pernah Jadi Relawan"
            value={volunteer?.is_already_tax_volunteer ?? "-"}
          />
          <ValueColumn
            label="Status"
            value={
              volunteer?.status ? (
                <ChipStatus label={volunteer.status.toLowerCase()} />
              ) : (
                "-"
              )
            }
          />

          <ValueColumn
            label="Tanggal Dibuat"
            value={
              volunteer?.created_at ? formatDate(volunteer.created_at) : "-"
            }
          />
          <ValueColumn
            label="Tanggal Diperbarui"
            value={
              volunteer?.updated_at ? formatDate(volunteer.updated_at) : "-"
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
  );
};

export default TaxVolunteerNonMBKMDetailPage;
