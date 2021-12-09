import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditClick from "../EditClick"; // Edit Model (Stock , Order)
import DeleteOnClick from "../DeleteOnClick"; //Edit Model (Stock , Order)
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const OrderStatusBody = ({ rowsPerPage, page, emptyRows, rows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell align="left">{row.avatar}</TableCell>
          <TableCell align="right">{row.customername}</TableCell>
          <TableCell align="right">{row.productname}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">{row.totalprice}</TableCell>
          <TableCell align="right">{row.stdate}</TableCell>
          <TableCell align="right">{row.endate}</TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              sx={{
                mr: 1,
                backgroundColor: "#7074E5",
                maxWidth: 10,
                "&:hover": {
                  backgroundColor: "#484b94",
                },
              }}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FD8A75", fontSize: 10, maxWidth: 10 }}
            >
              <CloseIcon />
            </Button>
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

export default OrderStatusBody;
