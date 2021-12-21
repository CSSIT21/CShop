import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingComponent from "../LoadingComponent";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const HistoryTable = ({ columns }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(
    order_id,
    avatar,
    productname,
    customername,
    amount,
    totalprice,
    status,
    orderdate
  ) {
    return {
      order_id,
      avatar,
      productname,
      customername,
      amount,
      totalprice,
      status,
      orderdate,
    };
  }

  const [rows, setRows] = useState([]);
  const shopid = useParams();

  const fetchorderlog = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/getorderlog`
      );

      // console.log(res.data);
      const created = res.data.map((el) =>
        createData(
          el.order_id,
          el.avatar,
          el.productname,
          el.customername,
          el.amount,
          el.totalprice,
          el.status,
          el.orderdate
        )
      );

      setRows(created);
      setOpen(false);

      // console.log(rows)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchorderlog();
    // console.log(rows);

    // console.log(shopid.id)
  }, [rows]);
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
                    <TableCell>
                      <Box sx={{ display: "block", textAlign: "center" }}>
                        {" "}
                        <Typography variant="h4" component="div">
                          No results found.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
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
                                  } else if (column.id === "avatar") {
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

export default HistoryTable;
