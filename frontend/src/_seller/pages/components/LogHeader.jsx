import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
const LogHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>OrderId</TableCell>
        <TableCell align="right">Product</TableCell>
        <TableCell align="right">CustomerName&nbsp;</TableCell>
        <TableCell align="right">amount&nbsp;</TableCell>
        <TableCell align="right">TotalPrice&nbsp;(bath)</TableCell>
        <TableCell align="right">Status&nbsp;</TableCell>
        <TableCell align="right">Create At&nbsp;</TableCell>
        <TableCell align="right">Last Update&nbsp;</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LogHeader;
