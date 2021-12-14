import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import CarouselButton from "~/common/components/CarouselButton";
import Carousel from "~/common/components/Carousel";
import Coupon from "./Coupon";
import { useParams } from "react-router";
const couponsMock = [
  {
    discount_id: 1,
    shop_id: 1,
    quantity: 100,
    discount_id_from_discount_shop: {
      id: 1,
      code: "CSHOP",
      start_date: "2021-12-13T20:52:35.000Z",
      end_date: "2022-12-13T20:52:38.000Z",
      description: "First voucher",
      class: "ReducePrice",
      min_price: 100,
      reduce_price: 20,
      discount_types: "Shop",
      added_date: "2021-12-13T20:51:56.000Z",
    },
  },
];

const Voucher = ({ shopcoupons }) => {
  const classes = useStyles();
  const [coupons, setcoupons] = useState(shopcoupons);
  const { id, cateId } = useParams();
  const [page, setPage] = useState(0);
  const couponsPerRow = 2;
  const totalPage = Math.ceil(coupons.length / couponsPerRow);
  const handleClaim = (idx) => {
    setcoupons(
      coupons.filter((coupon, id) => {
        id != idx;
      })
    );
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", color: "#FD6637" }}
        >
          Shop Voucher
        </Typography>
        <CarouselButton
          pageHandle={setPage}
          currentPage={page}
          totalPage={totalPage}
        />
      </Box>

      <Box className={classes.content}>
        <Carousel
          items={coupons}
          pageState={page}
          setPageState={setPage}
          itemsPerRow={couponsPerRow}
        >
          {(coupon, idx) => (
            <Coupon
              key={coupon.id}
              coupon={coupon}
              claimProps={{
                disabled: coupon.claimed,
                title: "Claim",
              }}
              onClick={() => handleClaim(idx)}
            />
          )}
        </Carousel>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  wrapper: {
    margin: "100px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  content: {
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
    backgroundColor: "#FDF4DD",
    borderRadius: "15px",
  },
});

export default Voucher;
