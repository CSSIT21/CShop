import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "#FDF4DD",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 25px 2px #FDF4DD",
  },
});

const LogHeader = () => {
  const classes = useStyles();
  return (
    <TableHead className={classes.root}>
      <TableRow>
        <TableCell sx={{ color: "#FD6637" }}>OrderId</TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          Product
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          CustomerName&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          amount&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          TotalPrice&nbsp;(bath)
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          Status&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          Create At&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          Last Update&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
          Actions&nbsp;
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LogHeader;
