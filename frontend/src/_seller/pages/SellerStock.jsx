import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState,useEffect } from "react";
import Indicator from "./components/Indicator";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Button from "@mui/material/Button";
import CategoryPic1 from "~/common/assets/images/category-1.png";
import AddProduct from "./components/AddProduct";
import SellerSearch from "./components/SellerSearch";
import AddIcon from "@mui/icons-material/Add";
import GroupCard from './components/CardGroup'
import StockBody from "./components/TableContent/StockBody";
import Avatar from "@mui/material/Avatar";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import PageHeader from './components/PageHeader'

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const SellerStock = () => {
  const Pagename = "Stock";

  const columns = [
    { id: "productId", label: "productId" },

    {
      id: "productname",
      label: "productname",
      align: "right",
    },

    {
      id: "amount",
      label: "amount",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "price",
      label: "price/pcs",
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];



  const [product, setProduct] = useState(false);

  function createData(productId, productname, amount, price) {
    return {
      productId,
      productname,
      amount,
      price,
    };
  }

  return (
    <>
      <Box>
        <GroupCard></GroupCard>
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
        <PageHeader Pagename={Pagename}/>
        {/* <SellerSearch Pagename={Pagename} /> */}
        <Button variant="contained" size="large" onClick={setProduct}>
          {<AddIcon fontSize="24" />}&nbsp;New Product
        </Button>
      </Box>
      <Box sx={{ mt: "4rem" }} />

      <StockBody columns={columns} />
    </>
  );
};

export default SellerStock;
