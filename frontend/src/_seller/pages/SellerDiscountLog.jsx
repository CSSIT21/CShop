import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography, Modal, Input } from "@mui/material";
import SellerSearch from "./components/SellerSearch";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SellerDiscountLog = () => {
  const shopid = useParams();
  const shopint = shopid.id;
  const Pagename = "Coupon";

  const columns = [
    { id: "discountID", label: "discountID" },
    {
      id: "code",
      label: "code",
      align: "right",
    },
    {
      id: "picture_path",
      label: "picture_path",
      align: "right",
    },
    {
      id: "startdate",
      label: "startdate",
      align: "right",
    },
    {
      id: "end_date",
      label: "end_date",
      align: "right",
    },
    {
      id: "discountclass",
      label: "discountclass",
      align: "right",
    },
    {
      id: "discount_types",
      label: "discount_types",
      align: "right",
    },
    {
      id: "quantity",
      label: "quantity",
      format: (value) => value.toFixed(2),
      align: "right",
    },
    {
      id: "max_quantity",
      label: "max_quantity",
      format: (value) => value.toFixed(2),
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
          <Button
            // onClick={testparams}
            variant="contained"
            startIcon={
              <ConfirmationNumberOutlinedIcon sx={{ fontSize: "1.52em" }} />
            }
            sx={{
              textTransform: "capitalize",
              height: "5vh",
              display: "flex",
              pl: 8,
              pr: 8,
            }}
          >
            <Link to={`${Pagename}`} sx={{ color: "white" }}>
              <Typography
                sx={{
                  fontSize: "1.52em",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Create
              </Typography>
            </Link>
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: "3rem" }} />
      <HistoryDiscountBody columns={columns} />
    </Box>
  );
};

export default SellerDiscountLog;
