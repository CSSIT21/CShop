import React, { useState, useEffect } from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import ProductSuggestion from "../sections/ProductSuggestion";
import fakeProducts from "~/common/faker/fakeProducts";
import { Box } from "@mui/material";
import ReviewsFromCustomer from "../sections/ReviewsFromCustomer";
import { useParams } from "react-router";
import axios from "axios";

const ProductPage = (props) => {
  const [products, setProducts] = useState(fakeProducts);
  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();

  const onFavourite = (index) => {
    setProducts((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://localhost:8080/product/${id}`).then(({ data }) => {
      setProductDetails(data.product_details);
    });
    console.log(productDetails);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box maxWidth="1200px">
        <ReviewsFromCustomer />
        <ProductDetails productDetails={productDetails} />
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
