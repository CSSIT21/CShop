import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TopSeller from "./components/TopSeller";
import Card from "@mui/material/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Indicator from "./components/Indicator";
import { Chart } from "./components/TableContent/Chart";
import CardGroup from "./components/CardGroup";
import ViewLog from "./components/ViewLog";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <Box>
      <TopSeller />
      <CardGroup />

      <Box
        sx={{
          Width: "95%",
          pl: 4,
          pr: 4,
          // display: "flex",
          // textAlign: "center",
          // justifyContent: "center",
        }}
      >
        {/* <Chart /> */}
        <ViewLog />
      </Box>
    </Box>
  );
};

export default SellerDashboard;
