import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export type Column<RowType extends Record<string, unknown>> = {
  header: React.ReactNode;
  accessor?: keyof RowType;
  cell?: (row: RowType) => React.ReactNode;
};

interface ReusableTableProps<RowType extends Record<string, unknown>> {
  columns: Array<Column<RowType>>;
  data: Array<RowType>;
}

const ReusableTable = <RowType extends Record<string, unknown>>({
  columns,
  data,
}: ReusableTableProps<RowType>) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="reusable table">
        <TableHead
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[800],
          }}
        >
          <TableRow>
            {columns.map((col, colIndex) => (
              <TableCell
                key={colIndex}
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ textAlign: "center", py: 4 }}
              >
                No data to display.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {columns.map((col, colIndex) => {
                  const cellContent: React.ReactNode = col.cell
                    ? col.cell(row)
                    : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null;
                  if (colIndex === 0) {
                    return (
                      <TableCell
                        key={colIndex}
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "medium" }}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={colIndex} align="left">
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReusableTable;
