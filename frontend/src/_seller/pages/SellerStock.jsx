import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import config from "~/common/constants";

import React, { useState } from "react";

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

import StockBody from "./components/TableContent/StockBody";
import Avatar from "@mui/material/Avatar";
import authState from "../../common/store/authState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const SellerStock = () => {
  const Pagename = "Stock";
  const auth = useRecoilValue(authState);

  const shopid = useParams();

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        `${config.SERVER_URL}/sellerconsole/${shopid.id}/stock`
      );
      // console.log(res.data);
      Productdata.push(res.data);
      // console.log(Productdata[0]);
      // console.log(Productdata[0].map(product =>console.log(product.id)))
      createProduct()
      // console.log(tests[0])
      // console.log(rows)
    } catch (e) {
      console.log(e);
    }
  };

  const Productdata = [];

  useEffect(async () => {
    await fetchStock();

    // console.log(shopid.id)
  }, []);

  const rows = [
    // createData(1, "Frozen yoghurt", 24, 4.0),
    // createData(2, "Ice cream sandwich", 9, 37),v
    // createData(3, "Eclair", 16, 24),
    // createData(4, "Cupcake", 3, 67),
    // createData(5, "Gingerbread", 16, 49),อ
  ];

  const createProduct = async () => {
    return await Productdata[0].map((product) => {
      rows.push(createData(product.id, product.title, product.quantity, product.price));
      // console.log(rows)
    });

  };

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

      <StockBody rows={rows} columns={columns} />
    </>
  );
};

export default SellerStock;
