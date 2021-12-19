import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Avatar, Typography, Modal, Input } from "@mui/material";
import Button from "@mui/material/Button";
import PageHeader from "./components/PageHeader";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LinearProgress from "@mui/material/LinearProgress";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import FlashSalesLogBody from "./components/TableContent/FlashSalesLogBody";

const SellerFlashSalesLog = () => {
  const shopid = useParams();
  const shopint = shopid.id;
  const Pagename = "FlashSale Log";

  const columns = [
    { id: "id", label: "id" },
    { id: "title", label: "title" },
    { id: "start_date", label: "start_date" },
    {
      id: "end_date",
      label: "end_date",
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

        <Box sx={{ mt: "3rem" }} />

        <FlashSalesLogBody columns={columns} />
      </Box>
    </>
  );
};

export default SellerFlashSalesLog;
