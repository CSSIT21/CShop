import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import HistoryDiscountBody from "./components/TableContent/HistoryDiscountBody";
import PageHeader from "./components/PageHeader";
import HistoryTable from "./components/TableContent/OrderHistoryBody";

const SellerDiscountLog = () => {
  const Pagename = "Discount History";
  const auth = useRecoilValue(authState);

  function createData(discountID, productName, customerName, used_date) {
    return { discountID, productName, customerName, used_date };
  }

  const rows = [
    createData(1, "Chicken Wing", "John A", "2021-11-21 11:15:16"),
    createData(2, "Chicken Wang", "John B", "2021-11-22 12:15:16"),
    createData(3, "Chicken Wong", "John C", "2021-11-23 13:15:16"),
    createData(4, "Chicken Weng", "John D", "2021-11-24 14:15:16"),
    createData(5, "Chicken Wung", "John E", "2021-11-25 15:15:16"),
    createData(6, "Chicken Bee", "John F", "2021-11-26 16:15:16"),
    createData(7, "Chicken Aaa", "John G", "2021-11-27 17:15:16"),
  ];
  // ------------------------------------

  const columns = [
    { id: "discountID", label: "discountID" },
    {
      id: "productName",
      label: "productName",
      align: "right",
    },
    {
      id: "customerName",
      label: "customerName",
      align: "right",
    },
    {
      id: "used_date",
      label: "used_date",
      align: "right",
    },
  ];

  return (
    <Box>
      <Box sx={{ mt: "4rem" }} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <PageHeader Pagename={Pagename} />
      </Box>
      <Box sx={{ mt: "4rem" }} />

      {/* <LogTable rows={rows} headerName={headerName} /> */}

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <LogHeader headerName={headerName} />
          <HistoryDiscount
            rowsPerPage={rowsPerPage}
            page={page}
            emptyRows={emptyRows}
            rows={rows}
          />
          <LogFooter
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            TablePaginationActions={TablePaginationActions}
          />
        </Table>
      </TableContainer> */}
      {/* <HistoryTable rows={rows} columns={columns} /> */}
      <HistoryDiscountBody rows={rows} columns={columns}/>
    </Box>
  );
};

export default SellerDiscountLog;
