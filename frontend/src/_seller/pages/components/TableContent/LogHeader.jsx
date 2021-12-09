import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { ConstructionOutlined } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    background: "#FDF4DD",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 25px 2px #FDF4DD",
  },
});

const LogHeader = ({ headerName }) => {
  const classes = useStyles();
  // headerName.map((index, key) => console.log({index}.index));
  return (
    <TableHead className={classes.root}>
      <TableRow>
        <TableCell sx={{ color: "#FD6637" }}>{headerName[0]}</TableCell>
        {headerName.map((index, key) =>
          key == 0 ? (
            ""
          ) : (
            <TableCell key={key} sx={{ color: "#FD6637", textAlign: "right" }}>
              {index}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default LogHeader;
