import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Carousel from "~/common/components/Carousel";
import ProductCard from "~/common/components/ProductCard";
import CarouselButton from "~/common/components/CarouselButton";

const useStyles = makeStyles({
  bestsellerWrapper: {
    width: "100%",
    margin: "20px 0",
  },

  bestsellerContent: {
    margin: "0 auto",
    padding: "40px 80px",

    borderRadius: "20px",
    marginBottom: "40px",
  },

  bestsellerHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  bestsellerCarousel:{
  }
});

const CarouselProduct = ({ items, onFavourite, filterName }) => {
  const [products, setProducts] = useState(items);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const productsPerRow = 6;
  const totalPage = Math.ceil(products.length / productsPerRow);

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

        <Box className={classes.bestsellerCarousel}>
          <Carousel
            items={products}
            pageState={page}
            setPageState={setPage}
            itemsPerRow={productsPerRow}
            gap={1}
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
    </Box>
  );
};

export default CarouselProduct;
