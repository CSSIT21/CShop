import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import LogHeader from "./components/LogHeader";
import LogBody from "./components/LogBody";
import LogFooter from "./components/LogFooter";
import SellerSearch from "./components/SellerSearch";
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
  id,
  orderId,
  products,
  customername,
  amount,
  totalprice,
  status,
  stdate,
  endate
) {
  return {
    id,
    orderId,
    products,
    customername,
    amount,
    totalprice,
    status,
    stdate,
    endate,
  };
}

// ------------------------------------
const rows = [
  createData(
    1,
    "001",
    "Frozen yoghurt",
    "john",
    24,
    4.0,
    "cancel",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    2,
    "002",
    "Ice cream sandwich",
    "jojo",
    9,
    37,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    3,
    "003",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    4,
    "004",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    5,
    "005",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    6,
    "006",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    7,
    "007",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    8,
    "008",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    9,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    10,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    11,
    "001",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    12,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    13,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    14,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    15,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    16,
    "001",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    17,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    18,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
].sort((a, b) => (a.id < b.id ? -1 : 1));
// ------------------------------------

export default function SellerStockLog() {
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

  const Pagename = "Order History";

  return (
    <>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <LogHeader />
            <LogBody
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
    </>
  );
}
