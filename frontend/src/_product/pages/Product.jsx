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
  const [productsSuggestion, setProductsSuggestion] = useState();
  const [productDetails, setProductDetails] = useState({ title: "" });
  const [commentPictures, setCommentPictures] = useState();
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [productPictures, setProductPictures] = useState();
  const [shopDetail, setShopDetails] = useState();
  const [comments, setComments] = useState();
  const [avgRating, setAvgRating] = useState();
  const [options, setOptions] = useState();
  const [favorite, setFavorite] = useState(true);
  const [shopId, setShopId] = useState(-1);
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const onFavouriteSuggestion = (index) => {
    console.log(productsSuggestion);
    setProductsSuggestion((items) => {
      if (auth.isLoggedIn) {
        const target = items?.find((e) => e.id == index);
        if (target.customer_wishlist.length > 0) {
          target.customer_wishlist.pop();
        } else {
          target.customer_wishlist = [
            { product_id: target.id, customer_id: auth.user.id },
          ];
        }
      } else {
        Swal.fire({
          title: "Please login to add a product to your wishlist!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      return [...items];
    });

    // setProductsSuggestion((products) => {
    //   console.log(products);
    //   const target = products[index];
    //   target.favourite = !target.favourite;

    //   return [...products];
    // });
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
          Swal.fire({
            title: "Success!",
            text: "Copied link",
            icon: "success",
            timer: 2000,
          });
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
    updateSuggestProduct();
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

    //
  }, [id]);

  const addToCart = () => {
    let options = [Object.keys(selected).length];
    Object.entries(selected).forEach(([key, value], i) => {
      console.log(i);
      options[i] = value;
      console.log(`${key}: ${value}`);
    });
    axios
      .post(`${config.SERVER_URL}/cart/addtocart`, {
        userID: auth.user.customer_info?.customer_id,
        productId: parseInt(id),
        amount: count,
        firstchoiceId: options[0] ? options[0] : undefined,
        secondchoiceId: options[1] ? options[1] : undefined,
      })
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setOpen(true);
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
  };

  const updateSuggestProduct = () => {
    // Update suggestion product id
    axios
      .get(`https://ml-1.cshop.cscms.ml/relatedProduct?id=${id}`)
      .then(({ data }) => {
        if (data) {
          console.log(data);
          // Update here -- > getSuggestProduct(data)
          axios
            .post(`${config.SERVER_URL}/product/${id}/updateSuggest`, data)
            .then(({ data }) => {
              if (data.success) {
                getSuggestProduct();
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
  };

  const getSuggestProduct = () => {
    // Get suggestion product detail
    axios
      .get(`${config.SERVER_URL}/product/${id}/getSuggest`)
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          setProductsSuggestion(data.suggest_products);
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
  };
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
          favorite={favorite}
          setFavorite={setFavorite}
          addToCart={addToCart}
          selected={selected}
          setSelected={setSelected}
          count={count}
          setCount={setCount}
          open={open}
          setOpen={setOpen}
          setProductDetails={setProductDetails}
        />
        <ShopDetails
          shopId={shopId}
          auth={auth}
          shopDetail={shopDetail || null}
          avgRating={avgRating}
        />
        <ProductSuggestion
          suggestionItems={productsSuggestion || []}
          onFavourite={onFavouriteSuggestion}
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
