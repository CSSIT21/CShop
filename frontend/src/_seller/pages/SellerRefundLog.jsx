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
import HistoryRefundBody from "./components/TableContent/HistoryRefundBody";
import PageHeader from "./components/PageHeader";

const SellerRefundLog = () => {
  const Pagename = "Refund History";
  const auth = useRecoilValue(authState);

  function createData(
    refundid,
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
      refundid,
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

  const columns = [
    { id: "refundid", label: "refundid" },
    { id: "avatar", label: "avatar" },
    {
      id: "customerName",
      label: "customerName",
      align: "right",
    },
    {
      id: "productName",
      label: "productName",
      align: "right",
    },
    {
      id: "amount",
      label: "amount",
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "totalprice",
      label: "totalprice",
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "type",
      label: "type",
      align: "right",
    },
    {
      id: "stdate",
      label: "stdate",
      align: "right",
    },
    {
      id: "refund_time",
      label: "refund_time",
      align: "right",
    },
  ];

  const rows = [
    createData(
      1,
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
      2,
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
      3,
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
      4,
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
      5,
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
      6,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "Inwza006",
      "RGB Plectrum",
      12,
      60,
      "Not Statisfy",
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
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
      <HistoryRefundBody rows={rows} columns={columns} />
    </Box>
  );
};

export default SellerRefundLog;
