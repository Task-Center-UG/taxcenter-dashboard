import type { Column } from "@/components/table/ReusableTable";

export const columns: Array<Column<any>> = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Category", accessor: "category" },
  { header: "Sub Category", accessor: "sub_category" },
  { header: "Created At", accessor: "created_at" },
  { header: "Updated At", accessor: "updated_at" },
  { header: "Action", accessor: "action" },
];

export const data: any[] = [];
