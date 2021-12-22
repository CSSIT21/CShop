import { useState, useEffect } from "react";
import { Avatar, Typography, Modal, Input,Box } from "@mui/material";
import authState from "~/common/store/authState";
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

import EventPromotionBody from "../components/EventPromotionBody";

import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import config from "~/common/constants";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ShowEventPromotion = () => {
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
    // {
    //   id: "discount_types",
    //   label: "discount_types",
    //   align: "right",
    // },
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
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
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
        </Box> */}
        <h3>Event Promotion information</h3>
      </Box>

      <Box sx={{ mt: "3rem" }} />
      <EventPromotionBody columns={columns} />
    </Box>
  );
};

export default ShowEventPromotion;
