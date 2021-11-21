import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import LogHeader from "./components/LogHeader";

import LogFooter from "./components/LogFooter";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import HistoryRefundBody from "./components/HistoryRefundBody";
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
  customerName,
  productName,
  amount,
  totalprice,
  type,
  stdate,
  refund_time
) {
  return {
    avatar,
    customerName,
    productName,
    amount,
    totalprice,
    type,
    stdate,
    refund_time,
  };
}

const SellerRefundLog = () => {
  const Pagename = "Discount History";
  const auth = useRecoilValue(authState);

  const headerName = [
    "avatar",
    "customerName",
    "productName",
    "amount",
    "totalprice",
    "type",
    "stdate",
    "refund_time",
  ];

  const rows = [
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza001",
      "Red Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza002",
      "Green Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza003",
      "Blue Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza004",
      "Magenta Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza005",
      "XXX Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza006",
      "RGB Plectrum",
      12,
      60,
      "Not Statisfy",
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
        <SellerSearch Pagename={Pagename} />
      </Box>
      <Box sx={{ mt: "4rem" }} />

      {/* <LogTable rows={rows} headerName={headerName} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <LogHeader headerName={headerName} />
          <HistoryRefundBody
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
  );
};

export default SellerRefundLog;
