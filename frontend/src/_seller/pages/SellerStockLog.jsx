import Box from "@mui/material/Box";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";

import StockLogBody from "./components/TableContent/StockLogBody";
import PageHeader from "./components/PageHeader";

import { useState, useEffect } from "react";
import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SellerStockLog() {
  const Pagename = "Stock Log";
  const auth = useRecoilValue(authState);



  const columns = [
    { id: "productId", label: "productId" },
    {
      id: "product_picture",
      label: "product_picture",
      align: "right",
    },
    { id: "productName", label: "productName" },
    {
      id: "Quantity",
      label: "Quantity",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "TradeType",
      label: "Import/Export",
      align: "right",
    },

    {
      id: "totalquantity",
      label: "Total",
      format: (value) => value.toLocaleString("en-US"),
      align: "right",
    },
    {
      id: "update_date",
      label: "update_date",
      align: "right",
    },
  ];

  // const rows = [
  //   createData("0081", "PopCornLv10", 10, "Import", "2021-11-21 11:15:16"),
  //   createData("0082", "PopCornLv11", 10, "Export", "2021-11-21 11:15:16"),
  //   createData("0083", "PopCornLv12", 10, "Export", "2021-11-21 11:15:16"),
  //   createData("0084", "PopCornLv13", 10, "Import", "2021-11-21 11:15:16"),
  //   createData("0085", "PopCornLv14", 10, "Import", "2021-11-21 11:15:16"),
  //   createData("00811", "PopCornLv15", 10, "Import", "2021-11-21 11:15:16"),
  // ];

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

        <StockLogBody columns={columns} />
      </Box>
    </>
  );
}
