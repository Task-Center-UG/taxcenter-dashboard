import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import ChipStatus from "@/components/chip/ChipStatus";
import type { Column } from "@/components/table/ReusableTable";
import { formatDate, formatText } from "@/utils/useFormatter";

export const mbkmColumns: Array<Column<any>> = [
  { header: "Nama", accessor: "full_name" },
  { header: "NPM", accessor: "npm" },
  {
    header: "Jurusan",
    accessor: "major",
    cell(row) {
      return row.Major?.name || "-";
    },
  },
  { header: "Nomor Telepon", accessor: "phone_number" },
  { header: "Email", accessor: "email" },
  {
    header: "Status",
    accessor: "status",
    align: "center",
    cell(row) {
      return <ChipStatus label={row.status} />;
    },
  },
  {
    header: "Created At",
    accessor: "created_at",
    align: "center",
    cell: (row) => (
      <CreatorAvatar
        name={row.created_by?.username}
        date={formatDate(row.created_at)}
      />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    align: "center",
    cell: (row) => (
      <ButtonCustom
        label="View"
        to={`/program/relawan-pajak/pengguna/mbkm/${row.id}`}
      />
    ),
  },
];

export const nonMbkmColumns: Array<Column<any>> = [
  { header: "Nama", accessor: "full_name" },
  { header: "NPM", accessor: "npm" },
  {
    header: "Jurusan",
    accessor: "major",
    cell(row) {
      return row.Major?.name || "-";
    },
  },
  { header: "Nomor Telepon", accessor: "phone_number" },
  { header: "Email", accessor: "email" },
  {
    header: "Status",
    accessor: "status",
    align: "center",
    cell(row) {
      return <ChipStatus label={formatText(row.status)} />;
    },
  },
  {
    header: "Created At",
    accessor: "created_at",
    align: "center",
    cell: (row) => (
      <CreatorAvatar
        name={row.created_by?.username}
        date={formatDate(row.created_at)}
      />
    ),
  },
  {
    header: "Action",
    accessor: "action",
    align: "center",
    cell: (row) => (
      <ButtonCustom
        label="View"
        to={`/program/relawan-pajak/pengguna/non-mbkm/${row.id}`}
      />
    ),
  },
];
