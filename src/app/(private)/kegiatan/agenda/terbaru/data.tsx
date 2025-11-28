import type { Column } from "@/components/table/ReusableTable";
import CreatorAvatar from "@/components/avatar/CreatorAvatar";
import ButtonCustom from "@/components/button/ButtonCustom";
import { formatDate } from "@/utils/useFormatter";
import { Link } from "@mui/material";

export const columns: Array<Column<any>> = [
  { header: "Title", accessor: "title" },
  { header: "Description", accessor: "description" },
  {
    header: "URL Image",
    accessor: "picture_url",
    align: "center",
    cell: (row) => {
      const url = `${process.env.NEXT_PUBLIC_BASIC_URL}/${row.picture_url}`;
      return (
        <Link
          href={url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          fontWeight={600}
        >
          (View Image)
        </Link>
      );
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
      <ButtonCustom label="View" to={`/kegiatan/agenda/terbaru/${row.id}`} />
    ),
  },
];

export const data: any[] = [];
