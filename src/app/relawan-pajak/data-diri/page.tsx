"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import HeaderTitle from "@/components/card/HeaderTitle";
import { ValueColumn } from "@/components/value/ValueColumn";
import { getUserData, UserData } from "@/utils/userManager";
import { getDocumentUrl } from "@/utils/documentUrl";
import { Link } from "@mui/material";
import Loader from "@/components/loading/Loader";
import ChipStatus from "@/components/chip/ChipStatus";

const DataDiriPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!userData) {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500">Data pengguna tidak ditemukan</p>
          </div>
        </Card>
      </div>
    );
  }

  // Determine which registration data to use
  const registrationData =
    userData.mbkm_registration || userData.non_mbkm_registration;
  const registrationType = userData.mbkm_registration ? "MBKM" : "Non-MBKM";

  if (!registrationData) {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <div className="p-16 text-center">
            <p className="text-gray-500">
              Anda belum terdaftar sebagai relawan pajak
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <HeaderTitle>Data Diri Relawan Pajak ({registrationType})</HeaderTitle>
        <div className="p-8 grid grid-cols-3 gap-4">
          <ValueColumn
            label="Nama Lengkap"
            value={registrationData.full_name || "-"}
          />
          <ValueColumn label="NPM" value={registrationData.npm || "-"} />
          <ValueColumn label="Kelas" value={registrationData.class || "-"} />
          <ValueColumn label="Email" value={registrationData.email || "-"} />
          <ValueColumn
            label="Nomor Telepon"
            value={registrationData.phone_number || "-"}
          />
          <ValueColumn label="Alamat" value={registrationData.address || "-"} />
          <ValueColumn
            label="IPK"
            value={registrationData.ipk?.toString() || "-"}
          />
          <ValueColumn
            label="Status"
            value={<ChipStatus label={registrationData.status.toLowerCase()} />}
          />
          <ValueColumn
            label="Sudah Pernah Kegiatan Relawan Pajak?"
            value={registrationData.tax_volunteer_activities || "-"}
          />
          <ValueColumn
            label="Sudah Menjadi Relawan Pajak?"
            value={registrationData.is_already_tax_volunteer || "-"}
          />
          <ValueColumn
            label="Status Aktif"
            value={
              <ChipStatus label={registrationData.is_active.toLowerCase()} />
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
              registrationData.krs ? (
                <Link
                  href={getDocumentUrl(registrationData.krs)}
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
              registrationData.transcripts ? (
                <Link
                  href={getDocumentUrl(registrationData.transcripts)}
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

      <Card>
        <HeaderTitle>Informasi Akun</HeaderTitle>
        <div className="p-8 grid grid-cols-3 gap-4">
          <ValueColumn label="Username" value={userData.username || "-"} />
          <ValueColumn label="Email Akun" value={userData.email || "-"} />
          <ValueColumn label="Role" value={userData.role?.name || "-"} />
        </div>
      </Card>
    </div>
  );
};

export default DataDiriPage;
