import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SellerSearch from "./components/SellerSearch";

import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import PageHeader from "./components/PageHeader";
import HistoryTable from "./components/TableContent/OrderHistoryBody";
import LinearProgress from "@mui/material/LinearProgress";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
// ------------------------------------

export default function SellerStockLog() {
  const Pagename = "Order History";
  const auth = useRecoilValue(authState);

  // order_id,
  // avatar,
  // productname,
  // customername,
  // amount,
  // totalprice,
  // status,
  // orderdate,
  const columns = [
    { id: "order_id", label: "order_id" },
    { id: "avatar", label: "Avatar" },
    {
      id: "productname",
      label: "Product_Name",

      align: "right",
    },
    {
      id: "customername",
      label: "Customer_name",

      align: "right",
    },
    {
      id: "amount",
      label: "Amount",

      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalprice",
      label: "Totalprice",

      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "status",
      label: "Status",

      align: "right",
    },
    {
      id: "orderdate",
      label: "Order_date",

      align: "right",
    },
  ];

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
          <PageHeader Pagename={Pagename} />
        </Box>
        <Box sx={{ mt: "4rem" }} />

        {/* <LogTable rows={rows} headerName={headerName}/> */}
        <HistoryTable columns={columns}  />
      </Box>
    </>
  );
}
