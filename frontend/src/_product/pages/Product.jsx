import React, { useState, useEffect } from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import ProductSuggestion from "../sections/ProductSuggestion";
import fakeProducts from "~/common/faker/fakeProducts";
import { Box } from "@mui/material";
import TestDialog from "../sections/TestDialog";

const ProductPage = (props) => {
  const [products, setProducts] = useState(fakeProducts);

  const onFavourite = (index) => {
    setProducts((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <TestDialog />
        <ProductDetails />
        <ShopDetails />
        <ProductSuggestion
          suggestionItems={products}
          onFavourite={onFavourite}
        />
        <ProductDescription />
        <ProductRating />
      </Box>
    </Box>
  );
};

export default ProductPage;
