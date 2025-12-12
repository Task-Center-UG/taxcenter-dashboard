import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TableCellProps,
} from "@mui/material";
import Pagination from "../pagination/Pagination";

export type Column<RowType extends Record<string, unknown>> = {
  header: React.ReactNode;
  accessor?: keyof RowType;
  cell?: (row: RowType) => React.ReactNode;
  align?: TableCellProps["align"];
};

export interface PagingInfo {
  page: number;
  total_pages: number;
  total_items: number;
}

interface ReusableTableProps<RowType extends Record<string, unknown>> {
  columns: Array<Column<RowType>>;
  data: Array<RowType>;
  isLoading?: boolean;
  paging?: PagingInfo;
  onPageChange?: (page: number) => void;
}

const ReusableTable = <RowType extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  paging,
  onPageChange,
}: ReusableTableProps<RowType>) => {
  console.log("[ReusableTable] paging:", paging);
  console.log("[ReusableTable] onPageChange:", !!onPageChange);
  console.log("[ReusableTable] data length:", data.length);

  return (
    <Box>
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
                  // Apply the align prop to the header cell
                  align={col.align || "left"}
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", py: 10 }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
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
                          align={col.align || "left"}
                          sx={{ fontWeight: "medium" }}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={colIndex} align={col.align || "left"}>
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
      {paging && onPageChange && (
        <Pagination
          currentPage={paging.page}
          totalPages={paging.total_pages}
          totalItems={paging.total_items}
          onPageChange={onPageChange}
        />
      )}
    </Box>
  );
};

export default ReusableTable;
