import React from "react";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
const LogBody = ({ rowsPerPage, page, emptyRows, rows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.orderId}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.products}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.customername}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.amount}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.totalprice}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.status}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.stdate}
          </TableCell>
          <TableCell style={{}} align="right">
            {row.endate}
          </TableCell>
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

export default LogBody;
