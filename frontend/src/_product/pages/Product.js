import React from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

const ProductPage = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <ProductDetails />
      <ShopDetails />
      {/*<ProductSuggestion /> From Ann*/}
      <ProductDescription />
      <ProductRating />
    </Box>
  );
};
const useStyles = makeStyles({
  container: {},
});
export default ProductPage;
