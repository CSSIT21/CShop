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
import config from "../../common/constants";
import { useRecoilValue } from "recoil";
import authState from "../../common/store/authState";

const ProductPage = (props) => {
  const auth = useRecoilValue(authState);
  const [productsSuggestion, setProductsSuggestion] = useState(fakeProducts);
  const [productDetails, setProductDetails] = useState({ title: "" });
  const [commentPictures, setCommentPictures] = useState();
  const [productPictures, setProductPictures] = useState();
  const [shopDetail, setShopDetails] = useState();
  const [comments, setComments] = useState();
  const [options, setOptions] = useState();
  const [shopId, setShopId] = useState(0);
  const { id } = useParams();

  const onFavourite = (index) => {
    setProductsSuggestion((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  const copyLink = () => {
    axios
      .get(`${config.SERVER_URL}/product/shortlink/${id}`)
      .then(({ data }) => {
        if (data.success) {
          navigator.clipboard.writeText(data.link);
        } else alert("Fail to fetch data :(");
      });
  };

  useEffect(async () => {
    window.scrollTo(0, 0);
    // Product
    axios.get(`${config.SERVER_URL}/product/${id}`).then(({ data }) => {
      if (data.success) {
        setProductDetails(data.product_details.product);
        setProductsSuggestion(data.product_details.product.suggest_products);
      } else alert("Fail to fetch data :(");
    });
    // Shop
    axios.get(`${config.SERVER_URL}/product/${id}/shop`).then(({ data }) => {
      if (data.success) {
        setProductDetails(data.product_details.product);
        setShopId(data.shop_details.id);
        setShopDetails(data.shop_details);
      } else alert("Fail to fetch data :(");
    });
    // Comments
    axios
      .get(`${config.SERVER_URL}/product/${id}/comments`)
      .then(({ data }) => {
        if (data.success) {
          setComments(data.comments);
        } else alert("Fail to fetch data :(");
      });
    // Get product pictures
    await axios
      .get(`${config.SERVER_URL}/product/${id}/pictures`)
      .then(({ data }) => {
        if (data.success) {
          setProductPictures(data.pictures);
        } else alert("Fail to fetch data :(");
      });
    // Get comment pictures
    axios
      .get(`${config.SERVER_URL}/product/${id}/comments/pictures`)
      .then(({ data }) => {
        if (data.success) {
          setCommentPictures(data.pictures);
        } else alert("Fail to fetch data :(");
      });
    // Get options
    await axios
      .get(`${config.SERVER_URL}/product/${id}/options`)
      .then(({ data }) => {
        if (data.success) {
          setOptions(data.options);
        } else alert("Fail to fetch data :(");
      });
  }, [id]);
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
        <ProductDetails
          productDetails={productDetails}
          productPictures={productPictures}
          copyLink={copyLink}
          options={options}
          setOptions={setOptions}
          auth={auth}
        />
        <ShopDetails shopId={shopId} auth={auth} />
        <ProductSuggestion
          suggestionItems={productsSuggestion}
          onFavourite={onFavourite}
        />
        <ProductDescription />
        <ProductRating />
      </Box>
    </Box>
  );
};

export default ProductPage;
