import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import CarouselButton from "~/common/components/CarouselButton";
import Carousel from "~/common/components/Carousel";
import Coupon from "./Coupon";

const coupons = [
  {
    id: 1,
    title: "50% save for new user!!",
    remaining: 2,
    valid: "Until 31/12/2021",
    claimed: false,
  },
  {
    id: 2,
    title: "50% save for new user!!",
    remaining: 10,
    valid: "Until 31/12/2021",
    claimed: true,
  },
  {
    id: 3,
    title: "50% save for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
  },
];

const Voucher = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const couponsPerRow = 2;
  const totalPage = Math.ceil(coupons.length / couponsPerRow);
  const [currentCoupon, setCurrentCoupon] = useState(4);
  const handleClaim = () => {
    setCurrentCoupon(currentCoupon - 1);
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
              key={idx}
              coupon={coupon}
              currentCoupon={currentCoupon}
              totalCoupon={5}
              claimProps={{
                  disabled: coupon.claimed,
                  title: 'Claim',
                  onClick: handleClaim
              }}
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
