import React, { useState, useEffect } from "react";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingComponent from "../LoadingComponent";
import CircularProgress from "@mui/material/CircularProgress";

const StockBody = ({ columns }) => {
  const shopid = useParams();
  const [rows, setRows] = useState([]);

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/stock`
      );

      const created = res.data
        .slice(0, 20)
        .map((el) =>
          createData(
            el.id,
            el.product_picture[0].path,
            el.title,
            el.quantity,
            el.price
          )
        );
      setRows(created);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // setOpen(true);
    fetchStock();
    // console.log(rows)
    // console.log(shopid.id)
  }, [rows]);

  function createData(productId, path, productname, amount, price) {
    return {
      productId,
      path,
      productname,
      amount,
      price,
    };
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(true);
  return (
    <>
      <LoadingComponent open={open} />

      <Box sx={{ p: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead sx={{ backgroundColor: "#FDF4DD" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ color: "#FD6637" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows ? (
                rows.length == 0 ? (
                  <TableRow>
                    <TableCell sx={{ display: "block", textAlign: "center" }}>
                      <Typography variant="h4" component="div">
                        No results found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.productId}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {/* {column.format && typeof value === "number"
                              ? column.format(value)
                              : value} */}

                                {(() => {
                                  if (
                                    column.format &&
                                    typeof value === "number"
                                  ) {
                                    return column.format(value);
                                  } else if (column.id === "status") {
                                    if (value === "success") {
                                      return (
                                        <Chip
                                          label="Success"
                                          sx={{
                                            backgroundColor: "#f3ffd9",
                                            color: "#84ad28",
                                            fontWeight: "600",
                                          }}
                                        />
                                      );
                                    } else {
                                      return (
                                        <Chip
                                          label="Cancel"
                                          sx={{
                                            backgroundColor: "#ffddd9",
                                            color: "#FD3737",
                                            fontWeight: "600",
                                          }}
                                        />
                                      );
                                    }
                                  } else if (column.id === "path") {
                                    return (
                                      <Avatar
                                        src={value}
                                        variant="rounded"
                                        sx={{
                                          display: "flex",
                                          width: "100%",
                                          height: "10vh",
                                        }}
                                      ></Avatar>
                                    );
                                  } else {
                                    return value;
                                  }
                                })()}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                )
              ) : (
                <TableCell>
                  <LinearProgress />
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default StockBody;
