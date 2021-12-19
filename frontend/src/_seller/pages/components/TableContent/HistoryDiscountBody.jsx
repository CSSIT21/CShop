import { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Typography, Modal } from "@mui/material";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const HistoryDiscountBody = ({ columns }) => {
  const shopid = useParams();
  const [rows, setRows] = useState([]);

  function createData(
    discountID,
    code,
    picture_path,
    startdate,
    end_date,
    discountclass,
    discount_types,
    quantity,
    max_quantity
  ) {
    return {
      discountID,
      code,
      picture_path,
      startdate,
      end_date,
      discountclass,
      discount_types,
      quantity,
      max_quantity,
    };
  }

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/myCoupon`
      );

      const created = res.data.map((el) =>
        createData(
          el.discount_id,
          el.discount_id_from_discount_shop.code,
          el.discount_id_from_discount_shop.picture_path,
          el.discount_id_from_discount_shop.start_date,
          el.discount_id_from_discount_shop.end_date,
          el.discount_id_from_discount_shop.class,
          el.discount_id_from_discount_shop.discount_types,
          el.quantity,
          el.max_quantity
        )
      );
      setRows(created);
      // console.log(rows)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStock();
    // console.log(rows);

    // console.log(shopid.id)
  }, [rows]);

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.discountID}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}

                          {(() => {
                            if (column.format && typeof value === "number") {
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
              })}
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

export default HistoryDiscountBody;
