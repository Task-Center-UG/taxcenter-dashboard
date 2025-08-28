import type { Column } from "@/components/table/ReusableTable";

export const columns: Array<Column<any>> = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "URL Image", accessor: "url_image" },
  { header: "Created At", accessor: "created_at" },
  { header: "Updated At", accessor: "updated_at" },
  { header: "Action", accessor: "action" },
];

export const data: any[] = [];
