import React from "react";
import type { Column } from "@/components/table/ReusableTable";

type ProductRow = {
  id: number;
  name: string;
  color: string;
  category: string;
  price: string;
};

export const columns: Array<Column<ProductRow>> = [
  { header: "Product name", accessor: "name" },
  { header: "Color", accessor: "color" },
  { header: "Category", accessor: "category" },
  { header: "Price", accessor: "price" },
  {
    header: "Action",
    cell: (row: ProductRow) =>
      React.createElement(
        "a",
        {
          href: `/edit/${row.id}`,
          className:
            "font-medium text-blue-600 dark:text-blue-500 hover:underline",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            console.log("Editing:", row.name);
          },
        },
        "Edit"
      ),
  },
];

export const data: ProductRow[] = [
  {
    id: 1,
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    id: 2,
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
  {
    id: 3,
    name: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
];
