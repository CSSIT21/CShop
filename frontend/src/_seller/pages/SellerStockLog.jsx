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

import StockLogBody from "./components/TableContent/StockLogBody";
import PageHeader from "./components/PageHeader";

function createData(productId, productName, Quantity, TradeType, Update_Date) {
  return { productId, productName, Quantity, TradeType, Update_Date };
}

export default function SellerStockLog() {
  const Pagename = "Stock Log";
  const auth = useRecoilValue(authState);

  const columns = [
    { id: "productId", label: "productId" },
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
      id: "Update_Date",
      label: "Update_Date",
      align: "right",
    },
  ];

  const rows = [
    createData("0081", "PopCornLv10", 10, "Import", "2021-11-21 11:15:16"),
    createData("0082", "PopCornLv11", 10, "Export", "2021-11-21 11:15:16"),
    createData("0083", "PopCornLv12", 10, "Export", "2021-11-21 11:15:16"),
    createData("0084", "PopCornLv13", 10, "Import", "2021-11-21 11:15:16"),
    createData("0085", "PopCornLv14", 10, "Import", "2021-11-21 11:15:16"),
    createData("00811", "PopCornLv15", 10, "Import", "2021-11-21 11:15:16"),
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

        <StockLogBody rows={rows} columns={columns}/> 
      </Box>
    </>
  );
}
