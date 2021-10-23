import React from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";

const ProductPage = (props) => {
  return (
    <>
      <div className="navbar"></div> {/*From Ann*/}
      <div className="contents">
        This is ProductPage.
        <ProductDetails />
        <ShopDetails />
        {/*<ProductSuggestion /> From Ann*/}
        <ProductDescription />
        <ProductRating />
      </div>
    </>
  );
};

export default ProductPage;
