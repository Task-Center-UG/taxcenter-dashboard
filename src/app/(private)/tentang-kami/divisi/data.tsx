import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import type { Column } from "@/components/table/ReusableTable";
import { formatDate } from "@/utils/useFormatter";

export const columns: Array<Column<any>> = [
  { header: "Division Name", accessor: "name" },
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
      <ButtonCustom label="View" to={`/tentang-kami/divisi/${row.id}`} />
    ),
  },
];

export const data: any[] = [];
