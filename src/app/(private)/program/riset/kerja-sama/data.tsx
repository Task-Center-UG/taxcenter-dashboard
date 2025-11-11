import type { Column } from "@/components/table/ReusableTable";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import { formatDate } from "@/utils/useFormatter";
import { Link } from "@mui/material";

export const columns: Array<Column<any>> = [
  { header: "Title", accessor: "title" },
  { header: "Description", accessor: "description" },
  {
    header: "Category",
    accessor: "researchCategory",
    cell: (row) => row.researchCategory?.title || "-",
  },
  {
    header: "CTA URL",
    accessor: "cta_url",
    cell: (row) =>
      row.cta_url ? (
        <Link
          href={row.cta_url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          fontWeight={600}
        >
          (View Link)
        </Link>
      ) : (
        "-"
      ),
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
      <ButtonCustom label="View" to={`/program/riset/kerja-sama/${row.id}`} />
    ),
  },
];

export const data: any[] = [];
