import ButtonCustom from "@/components/button/ButtonCustom";
import type { Column } from "@/components/table/ReusableTable";
import { Link } from "@mui/material";

export const columns: Array<Column<any>> = [
  { header: "Title", accessor: "title" },
  {
    header: "URL Image",
    accessor: "url_image",
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
  { header: "Created At", accessor: "created_at", align: "center" },
  { header: "Updated At", accessor: "updated_at", align: "center" },
  {
    header: "Action",
    accessor: "action",
    align: "center",
    cell: (row) => <ButtonCustom label="View" />,
  },
];

export const data: any[] = [];
