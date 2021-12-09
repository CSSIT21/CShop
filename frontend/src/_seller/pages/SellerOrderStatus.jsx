import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LogHeader from "./components/TableContent/LogHeader";
import LogBody from "./components/TableContent/LogBody";
import LogFooter from "./components/TableContent/LogFooter";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import OrderStatusBody from "./components/TableContent/OrderStatusBody";
import PageHeader from "./components/PageHeader";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  avatar,
  customername,
  productname,
  amount,
  totalprice,
  stdate,
  endate
) {
  return {
    avatar,
    customername,
    productname,
    amount,
    totalprice,
    stdate,
    endate,
  };
}

const SellerOrderStatus = () => {
  const Pagename = "Order Status";
  const auth = useRecoilValue(authState);

  const headerName = [
    "avatar",
    "customername",
    "productname",
    "amount",
    "totalprice",
    "stdate",
    "endate",
    "action",
  ];

  const rows = [
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "A",
      "KFC",
      1,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "B",
      "McDonald",
      3,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "C",
      "BurgerKing",
      2,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "D",
      "BBQ",
      3,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "E",
      "AlotOfKhai",
      1,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
  ].sort((a, b) => (a.id < b.id ? -1 : 1));
  // ------------------------------------

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <LogHeader headerName={headerName} />
            {/* <HistoryDiscount
              rowsPerPage={rowsPerPage}
              page={page}
              emptyRows={emptyRows}
              rows={rows}
            /> */}
            <OrderStatusBody
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
        </TableContainer>
      </Box>
    </div>
  );
};

export default SellerOrderStatus;
