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
import Swal from "sweetalert2";

const ProductPage = (props) => {
  const auth = useRecoilValue(authState);
  const [productsSuggestion, setProductsSuggestion] = useState(fakeProducts);
  const [productDetails, setProductDetails] = useState({ title: "" });
  const [commentPictures, setCommentPictures] = useState();
  const [productPictures, setProductPictures] = useState();
  const [shopDetail, setShopDetails] = useState();
  const [comments, setComments] = useState();
  const [avgRating, setAvgRating] = useState();
  const [options, setOptions] = useState();
  const [shopId, setShopId] = useState(-1);
  const { id } = useParams();

  const onFavourite = (index) => {
    setProductsSuggestion((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  const avgRatingFormat = () => {
    let a = avgRating;
    let floor = Math.floor(a);
    let r = Math.abs(floor - a);
    if (r > 0.5) {
      a = floor + 1;
    } else if (r <= 0.5 && r != 0) {
      a = floor + 0.5;
    } else if (r == 0) {
      a = floor;
    }
    setAvgRating(a);
  };

  const copyLink = () => {
    axios
      .get(`${config.SERVER_URL}/product/shortlink/${id}`)
      .then(({ data }) => {
        if (data.success) {
          navigator.clipboard.writeText(`http://localhost:8080/l/${data.link}`);
        } else
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            confirmButtonText: "OK",
          });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Product
    axios
      .get(`${config.SERVER_URL}/product/${id}`)
      .then(({ data }) => {
        if (data.success) {
          setProductDetails(data.product_details);
          // setProductTitle(data.product_details?.title);
          let title = data.product_details.title;
          console.log(data.product_details.title);
          if (title) {
            // Suggestion product
            axios
              .get(
                `https://ml-2.cshop.cscms.ml/relatedProduct/${id}/${encodeURIComponent(
                  title
                )}`
              )
              .then(({ data }) => {
                console.log(data);
                // if (data.success) {
                //   setProductsSuggestion(data.suggest_products);
                // }
              })
              .catch((e) => {
                console.log(e.message);
                Swal.fire({
                  title: "Something went wrong!",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              });
          }
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    // Shop
    axios
      .get(`${config.SERVER_URL}/product/${id}/shop`)
      .then(({ data }) => {
        if (data.success) {
          setShopId(data.shop_details.id);
          setShopDetails(data.shop_details);
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    // Comments
    axios
      .get(`${config.SERVER_URL}/product/${id}/comments`)
      .then(({ data }) => {
        if (data.success) {
          setComments(data.comments.comment_list);
          setAvgRating(data.comments.avg_product_rating);
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    // Get product pictures
    axios
      .get(`${config.SERVER_URL}/product/${id}/pictures`)
      .then(({ data }) => {
        if (data.success) {
          setProductPictures(data.pictures);
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    // Get comment pictures
    axios
      .get(`${config.SERVER_URL}/product/${id}/comments/pictures`)
      .then(({ data }) => {
        if (data.success) {
          setCommentPictures(data.pictures);
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    // Get options
    axios
      .get(`${config.SERVER_URL}/product/${id}/options`)
      .then(({ data }) => {
        if (data.success) {
          setOptions(data.options);
        }
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, [id]);

  useEffect(() => {
    avgRatingFormat();
  }, [avgRating]);

  // console.log(productTitle);

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
        <ShopDetails
          shopId={shopId}
          auth={auth}
          shopDetail={shopDetail || null}
          avgRating={avgRating}
        />
        <ProductSuggestion
          suggestionItems={productsSuggestion}
          onFavourite={onFavourite}
        />
        <ProductDescription
          productDetails={productDetails?.product_detail?.info}
        />
        <ProductRating
          avgRating={avgRating || null}
          commentPictures={commentPictures || []}
          comments={comments || []}
        />
      </Box>
    </Box>
  );
};

export default ProductPage;
