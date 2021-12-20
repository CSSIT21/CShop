import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Carousel from "~/common/components/Carousel";
import ProductCard from "~/common/components/ProductCard";
import CarouselButton from "~/common/components/CarouselButton";
import authState from "~/common/store/authState";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRecoilValue } from "recoil";

const useStyles = makeStyles({
  bestsellerWrapper: {
    width: "100%",
  },

  bestsellerContent: {
    margin: "0 auto",
    padding: "40px 0",

    borderRadius: "20px",
    marginBottom: "40px",
  },

  bestsellerHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
});

const CarouselProduct = ({ items, filterName }) => {
  const [products, setProducts] = useState(items);
  const auth = useRecoilValue(authState);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const productsPerRow = 5;
  const totalPage = Math.ceil(products.length / productsPerRow);
  console.log(page);
  const onFavourite = (index) => {
    setProducts((items) => {
      if (auth.isLoggedIn) {
        const target = items.find((e) => e.id == index);
        if (target.customer_wishlist.length > 0) {
          target.customer_wishlist.pop();
        } else {
          target.customer_wishlist = [
            { product_id: target.id, customer_id: auth.user.id },
          ];
        }
      } else {
        Swal.fire({
          text: "Please login to add a product to your wishlist!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      return [...items];
    });
  };
  return (
    <Box className={classes.bestsellerWrapper}>
      <Box className={classes.bestsellerContent}>
        <Box className={classes.bestsellerHeader}>
          <Typography
            component="span"
            color="#323232"
            fontSize="30px"
            fontWeight={600}
          >
            {filterName}
          </Typography>
          <CarouselButton
            pageHandle={setPage}
            currentPage={page}
            totalPage={totalPage}
          />
        </Box>

        <Carousel
          items={products}
          pageState={page}
          setPageState={setPage}
          itemsPerRow={productsPerRow}
          gap={20}
        >
          {(product, idx) => (
            <ProductCard
              product={product}
              onFavourite={onFavourite}
              to="/product/1"
              key={product.id}
            />
          )}
        </Carousel>
      </Box>
    </Box>
  );
};

export default CarouselProduct;
