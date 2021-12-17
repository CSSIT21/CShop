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

import OrderStatusBody from "./components/TableContent/OrderStatusBody";
import PageHeader from "./components/PageHeader";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SellerOrderStatus = () => {
  const Pagename = "Order Status";
  const auth = useRecoilValue(authState);

  function createData(
    orderid,
    avatar,
    customername,
    productname,
    amount,
    totalprice,
    stdate,
    endate
  ) {
    return {
      orderid,
      avatar,
      customername,
      productname,
      amount,
      totalprice,
      stdate,
      endate,
    };
  }

  const columns = [
    { id: "orderid", label: "orderid" },
    { id: "avatar", label: "avatar" },
    {
      id: "customername",
      label: "customername",
      align: "right",
    },
    {
      id: "productname",
      label: "productname",
      align: "right",
    },
    {
      id: "amount",
      label: "amount",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalprice",
      label: "totalprice",
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "stdate",
      label: "stdate",

      align: "right",
    },
    {
      id: "endate",
      label: "endate",

      align: "right",
    },
    {
      id: "action",
      label: "action",

      align: "right",
    },
  ];

  const rows = [
    createData(
      1,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "A",
      "KFC",
      1,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      2,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "B",
      "McDonald",
      3,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      3,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "C",
      "BurgerKing",
      2,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      4,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "D",
      "BBQ",
      3,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
    createData(
      5,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      "E",
      "AlotOfKhai",
      1,
      299,
      "2021-11-21 11:15:16",
      "2021-11-25 23:15:16"
    ),
  ];

  const handleClick = (id) => {
    const rm = rows.filter((row) => {
      row.orderid != id;
    });
    // rows = rm;
    console.log(rm);
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
        <OrderStatusBody
          rows={rows}
          columns={columns}
          handleClick={handleClick}
        />
      </Box>
    </div>
  );
};

export default SellerOrderStatus;
