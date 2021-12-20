import { useState, useEffect } from "react";

import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Typography, Modal } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
const ViewLogBody = ({ columns }) => {
  const shopid = useParams();
  const [rows, setRows] = useState([]);

  function createData(id, firstname, lastname, gender, view_date) {
    return {
      id,
      firstname,
      lastname,
      gender,
      view_date,
    };
  }

  const fetchCView = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/getcustomerviews`
      );

      // console.log(res.data);
      const created = res.data.map((el) =>
        createData(
          el.id,
          el.customer_id_from_home_shop_log.customer_info.firstname,
          el.customer_id_from_home_shop_log.customer_info.firstname,
          el.customer_id_from_home_shop_log.customer_info.gender,
          el.view_date
        )
      );

      setRows(created);
      // console.log(rows)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCView();
    // console.log(rows);

    // console.log(shopid.id)
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
                      No Data （；´д｀）ゞ
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                                } else if (column.id === "picture_path") {
                                  return (
                                    <Avatar
                                      src={value}
                                      variant="rounded"
                                      sx={{
                                        display: "flex",
                                        width: "100%",
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
    </>
  );
};

export default ViewLogBody;
