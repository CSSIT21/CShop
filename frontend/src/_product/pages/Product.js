import React, { useState } from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import ProductSuggestion from "../sections/ProductSuggestion";
import { Box } from "@mui/material";

const Bestseller1 =
  "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg";

const ProductPage = (props) => {
  const itemsData = [
    {
      id: 0,
      title: "Cheese Pizza very อร่อย มากๆๆๆ",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 1,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 2,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 3,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
    {
      id: 4,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 5,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: true,
      image: Bestseller1,
    },
    {
      id: 6,
      title: "Cheese Pizza",
      price: "500",
      status: "Hot sale",
      favourite: false,
      image: Bestseller1,
    },
  ];
  const [items, setItems] = useState(itemsData);
  const onFavourite = (e, idx) => {
    e.preventDefault();
    setItems((items) => {
      items[idx].favourite = !items[idx].favourite;
      return [...items];
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
        }}
      >
        <ProductDetails />
        <ShopDetails />
        <ProductSuggestion bestsellerItems={items} onFavourite={onFavourite} />
        <ProductDescription />
        <ProductRating />
      </Box>
    </Box>
  );
};

export default ProductPage;
