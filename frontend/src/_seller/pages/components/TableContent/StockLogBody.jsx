import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";
const StockLogBody = ({ rowsPerPage, page, emptyRows, rows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell align="left">{row.productId}</TableCell>
          <TableCell align="right">{row.productName}</TableCell>
          <TableCell align="right">{row.Quantity}</TableCell>
          <TableCell align="right">
            <Box>
              {row.TradeType == "Import" ? (
                <Chip
                  label="Import"
                  sx={{
                    backgroundColor: "#f3ffd9",
                    color: "#84ad28",
                    fontWeight: "600",
                  }}
                />
              ) : (
                <Chip
                  label="Export"
                  sx={{
                    backgroundColor: "#ffddd9",
                    color: "#FD3737",
                    fontWeight: "600",
                  }}
                />
              )}
            </Box>
          </TableCell>
          <TableCell align="right">{row.Update_date}</TableCell>
        </TableRow>
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default StockLogBody;
