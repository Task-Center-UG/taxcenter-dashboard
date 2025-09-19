import BaseAvatar from "@/components/avatar/BaseAvatar";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import type { Column } from "@/components/table/ReusableTable";
import { formatDate, formatText } from "@/utils/useFormatter";

export const columns: Array<Column<any>> = [
  {
    header: "Name",
    accessor: "name",
    cell: (row) => {
      const url = `${process.env.NEXT_PUBLIC_BASIC_URL}/${row.picture_url}`;
      return (
        <BaseAvatar title={row.name} imageUrl={url ?? null} size="small" />
      );
    },
  },
  {
    header: "Major",
    accessor: "major_id",
    cell: (row) => formatText(row.Major.name),
  },
  {
    header: "Division",
    accessor: "division_id",
    cell: (row) => formatText(row.Division.name),
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
  { header: "Action", accessor: "action" },
];

export const data: any[] = [];
