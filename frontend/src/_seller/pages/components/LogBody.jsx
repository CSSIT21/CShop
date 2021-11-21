import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const LogBody = ({ rowsPerPage, page, emptyRows, rows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            <div>
              {row.orderId ? <div>{row.orderId}</div> : <div>{row.avatar}</div>}
            </div>
          </TableCell>
          <TableCell align="right">{row.products}</TableCell>
          <TableCell align="right">{row.customername}</TableCell>
          <TableCell align="right">{row.amount}</TableCell>
          <TableCell align="right">{row.totalprice}</TableCell>
          <TableCell align="right">
            <Box>
              {row.status == "success" ? (
                <Chip
                  label="Success"
                  sx={{
                    backgroundColor: "#f3ffd9",
                    color: "#84ad28",
                    fontWeight: "600",
                  }}
                />
              ) : (
                <Chip
                  label="Cancel"
                  sx={{
                    backgroundColor: "#ffddd9",
                    color: "#FD3737",
                    fontWeight: "600",
                  }}
                />
              )}
            </Box>
          </TableCell>
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
              {<EditIcon sx={{ fontSize: 18 }} />}
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FD8A75", fontSize: 10, maxWidth: 10 }}
            >
              {<DeleteIcon />}
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

export default LogBody;
