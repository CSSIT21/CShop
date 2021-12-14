import { Typography } from "@mui/material";
import { Box } from "@mui/system";

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

const SellerStock = () => {
  const Pagename = "Stock";
  const auth = useRecoilValue(authState);

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

  function createData(
    productId,
    avatar,
    productImage,
    productname,
    customername,
    amount,
    totalprice,
    status,
    stdate,
    endate
  ) {
    return {
      productId,
      avatar,
      productImage,
      productname,
      customername,
      amount,
      totalprice,
      status,
      stdate,
      endate,
    };
  }

  const rows = [
    createData(
      1,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
      "Frozen yoghurt",
      "john",
      24,
      4.0,
      "cancel",
      "10/10/2021",
      "10/10/2021"
    ),
    createData(
      2,
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
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
      <Avatar src={auth.user.url} sx={{ width: 65, height: 65 }} />,
      CategoryPic1,
      "Gingerbread",
      "jotaro",
      16,
      49,
      "success",
      "10/10/2021",
      "10/10/2021"
    ),
  ];

  const columns = [
    { id: "productId", label: "productId" },
    { id: "avatar", label: "avatar" },
    {
      id: "productImage",
      label: "productImage",
      align: "right",
    },
    {
      id: "productname",
      label: "productname",
      align: "right",
    },
    {
      id: "customername",
      label: "customername",
      align: "right",
    },
    {
      id: "amount",
      label: "amount",
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "totalprice",
      label: "totalprice",
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "status",
      label: "status",
      align: "right",
    },
    {
      id: "stdate",
      label: "stdate",
      align: "right",
    },
    {
      id: "endate",
      label: "endate",
      align: "right",
    },
  ];

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
