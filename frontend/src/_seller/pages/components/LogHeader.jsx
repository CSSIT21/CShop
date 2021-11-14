import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
  root: {
    background: "#FDF4DD",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 25px 2px #FDF4DD",
  },
});

const LogHeader = ({rows,headerName}) => {
  const classes = useStyles();
  // console.log("headername",headerName)
  return (
    <TableHead className={classes.root}>
      <TableRow>
        <TableCell sx={{ color: "#FD6637" }}>{headerName[0]}</TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[1]}
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[2]}&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[3]}&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[4]}&nbsp;(bath)
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[5]}&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[6]}&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[7]}&nbsp;
        </TableCell>
        <TableCell sx={{ color: "#FD6637" }} align="right">
        {headerName[8]}&nbsp;
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LogHeader;
