import type { Column } from "@/components/table/ReusableTable";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import { formatDate } from "@/utils/useFormatter";

const formatCategory = (category: string) => {
  const categoryMap: Record<string, string> = {
    CORETAX: "Coretax",
    NPWP_CREATION: "NPWP Creation",
    SPT_FILLING: "SPT Filling",
    E_BILLING_CREATION: "E-Billing Creation",
  };
  return categoryMap[category] || category;
};

export const columns: Array<Column<any>> = [
  { header: "Title", accessor: "title" },
  {
    header: "Category",
    accessor: "category",
    cell: (row) => formatCategory(row.category),
  },
  {
    header: "Video URL",
    accessor: "video_url",
    cell: (row) => row.video_url || "-",
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
    header: "Updated At",
    accessor: "updated_at",
    align: "center",
    cell: (row) => (
      <CreatorAvatar
        name={row.updated_by?.username}
        date={formatDate(row.updated_at)}
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
        to={`/program/tax-clinic/info-edukasi/${row.id}`}
      />
    ),
  },
];

export const data: any[] = [];
