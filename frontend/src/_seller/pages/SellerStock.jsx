import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import React, { useState } from "react";

import Indicator from "./components/Indicator";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";

import AddProduct from "./components/AddProduct";
import SellerSearch from "./components/SellerSearch";
import AddIcon from "@mui/icons-material/Add";
import LogTable from "./components/TableContent/LogTable";

function createData(
  id,
  orderId,
  products,
  customername,
  amount,
  totalprice,
  status,
  stdate,
  endate,
  actions
) {
  return {
    id,
    orderId,
    products,
    customername,
    amount,
    totalprice,
    status,
    stdate,
    endate,
    actions,
  };
}

// ------------------------------------
const rows = [
  createData(
    1,
    "001",
    "Frozen yoghurt",
    "john",
    24,
    4.0,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    2,
    "002",
    "Ice cream sandwich",
    "jojo",
    9,
    37,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    3,
    "003",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    4,
    "004",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    5,
    "005",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    6,
    "006",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    7,
    "007",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    8,
    "008",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    9,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    10,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    11,
    "001",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    12,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    13,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    14,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    15,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    16,
    "001",
    "Eclair",
    "joluno",
    16,
    24,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    17,
    "001",
    "Cupcake",
    "joji",
    3,
    67,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
  createData(
    18,
    "001",
    "Gingerbread",
    "jotaro",
    16,
    49,
    "success",
    "10/10/2021",
    "10/10/2021"
  ),
].sort((a, b) => (a.id < b.id ? -1 : 1));
// ------------------------------------

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

  const [product, setProduct] = useState(false);

  const headerName = [
    "productId",
    "products",
    "customername",
    "amount",
    "totalprice",
    "status",
    "stdate",
    "endate",
  ];

  const Pagename = "Stock";
  return (
    <>
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
      </Box>
      <Box sx={{ mt: "4rem" }} />
      <AddProduct
        product={product}
        setProduct={setProduct}
        title=""
        description=""
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          p: 1,
          m: 1,
        }}
      >
        <SellerSearch Pagename={Pagename} />
        <Button variant="contained" size="large" onClick={setProduct}>
          {<AddIcon fontSize="24" />}&nbsp;New Product
        </Button>
      </Box>
      <Box sx={{ mt: "4rem" }} />
      <Box>
        <LogTable rows={rows} headerName={headerName} />
      </Box>
    </>
  );
};

export default SellerStock;
