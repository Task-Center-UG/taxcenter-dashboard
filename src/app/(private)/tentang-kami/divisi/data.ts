import type { Column } from "@/components/table/ReusableTable";

export const columns: Array<Column<any>> = [
  { header: "ID", accessor: "id" },
  { header: "Division Name", accessor: "name" },
  { header: "Lead", accessor: "lead" },
  { header: "Member Count", accessor: "member_count" },
  { header: "Created At", accessor: "created_at" },
  { header: "Updated At", accessor: "updated_at" },
  { header: "Action", accessor: "action" },
];

export const data: any[] = [];
