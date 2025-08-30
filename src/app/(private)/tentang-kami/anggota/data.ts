import type { Column } from "@/components/table/ReusableTable";

export const columns: Array<Column<any>> = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Contact Number", accessor: "contact_number" },
  { header: "Division", accessor: "division" },
  { header: "Created At", accessor: "created_at" },
  { header: "Updated At", accessor: "updated_at" },
  { header: "Action", accessor: "action" },
];

export const data: any[] = [];
