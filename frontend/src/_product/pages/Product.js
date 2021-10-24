import React from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import { Box } from "@mui/material";

const ProductPage = (props) => {
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
        {/*<ProductSuggestion /> From Ann*/}
        <ProductDescription />
        <ProductRating />
      </Box>
    </Box>
  );
};

export default ProductPage;
