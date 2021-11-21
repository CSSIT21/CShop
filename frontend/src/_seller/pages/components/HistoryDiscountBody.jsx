import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const HistoryDiscountBody = ({ rowsPerPage, page, emptyRows, rows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell align="left">{row.discountID}</TableCell>
          <TableCell align="right">{row.productName}</TableCell>
          <TableCell align="right">{row.customerName}</TableCell>
          <TableCell align="right">{row.used_date}</TableCell>
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

export default HistoryDiscountBody;
