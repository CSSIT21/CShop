import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Indicator from "./components/Indicator";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
const SellerStock = () => {
  const indicatorData = [
    {
      id: 0,
      value: "34.7",
      name: "Product",
      color: "#FEF3F1",
      fontColor: "#FD8A75",
      icon: ShoppingCartIcon,
    },
    {
      id: 1,
      value: "34.7",
      name: "Followers",
      color: "#FCF6DE",
      fontColor: "#EAC52E",
      icon: PeopleAltIcon,
    },
    {
      id: 2,
      value: "34.7",
      name: "Rating",
      color: "#E1F4F8",
      fontColor: "#42B8D4",
      icon: StarIcon,
    },
    {
      id: 3,
      value: "34.7",
      name: "Sales",
      color: "#E0F8F2",
      fontColor: "#43D5AE",
      icon: MonetizationOnIcon,
    },
  ];
  return (
    <Box>
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
      <Divider />
      <Typography variant="h4" fontWeight="600" sx={{ m: 1,}}>
        Stock
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          p: 1,
          m: 1,
        }}
      >
        <Box>
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
        <Button variant="contained" size="large">
          Medium
        </Button>
      </Box>
    </Box>
  );
};

export default SellerStock;
