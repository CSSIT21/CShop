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

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const SellerDashboard = () => {
  const shopid = useParams();

  const [cpd, setCpd] = useState();
  const [cfl, setCfl] = useState();
  const [crt, setCrt] = useState();
  const [csl, setCsl] = useState();

  const fetchCard = async () => {
    try {
      const pd = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToProduct`
      );
      const fl = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToFollows`
      );
      const rt = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToRating`
      );
      const sl = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToSales`
      );

      // console.log(pd.data.quantity);
      // console.log(fl.data.followers);
      // console.log(rt.data._avg.rating );
      // console.log(sl.data);

      setCpd(pd.data.quantity);
      setCfl(fl.data.followers);
      setCrt(rt.data._avg.rating);
      setCsl(sl.data);

 

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const indicatorData = [
    {
      id: 0,
      // value: {cpd},
      name: "Product",
      color: "#FEF3F1",
      fontColor: "#FD8A75",
      icon: ShoppingCartIcon,
    },
    {
      id: 1,
      // value: {cfl},
      name: "Followers",
      color: "#FCF6DE",
      fontColor: "#EAC52E",
      icon: PeopleAltIcon,
    },
    {
      id: 2,
      // value: {crt},
      name: "Rating",
      color: "#E1F4F8",
      fontColor: "#42B8D4",
      icon: StarIcon,
    },
    {
      id: 3,
      // value: {csl},
      name: "Sales",
      color: "#E0F8F2",
      fontColor: "#43D5AE",
      icon: MonetizationOnIcon,
    },
  ];
  return (
    <Box>
      <TopSeller />
      <Box
        sx={{
          alignContent: "center",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {indicatorData.map((indicator) => (
          <Indicator
            value={indicator.value}
            name={indicator.name}
            color={indicator.color}
            fontColor={indicator.fontColor}
            icon={indicator.icon}
            key={indicator.id}
          />
        ))}
      </Box>
      {/* <Chart/> */}
    </Box>
  );
};

export default SellerDashboard;
