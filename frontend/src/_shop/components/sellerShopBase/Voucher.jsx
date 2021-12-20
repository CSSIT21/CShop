import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import CarouselButton from "~/common/components/CarouselButton";
import Carousel from "~/common/components/Carousel";
import Coupon from "./Coupon";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Voucher = ({ shopcoupons }) => {
  const classes = useStyles();
  const auth = useRecoilValue(authState);
  const [coupons, setcoupons] = useState(shopcoupons);
  const [page, setPage] = useState(0);
  const couponsPerRow = 2;
  const totalPage = Math.ceil(coupons.length / couponsPerRow);
  const [loading, setloading] = useState(false);
  const handleClaim = (coupon_id) => {
    if (auth.isLoggedIn) {
      setloading(true);
      axios
        .post(`${config.SERVER_URL}/promotion/upshop`, {
          discount_id: coupon_id,
          userId: auth.user.id,
        })
        .then(() => {
          setcoupons(
            coupons.filter((coupon) => {
              return coupon.discount_id != coupon_id;
            })
          );
          setloading(false);
          Swal.fire({
            title: "Coupon claimed!",
            text: "Check it out! On your Voucher & Coupon!",
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    } else {
      Swal.fire({
        title: "Please login to claim a coupon!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  console.log(coupons);
  if (coupons.length > 0) {
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
                key={coupon.discount_id}
                coupon={coupon}
                loading={loading}
                onClick={() => handleClaim(coupon.discount_id)}
              />
            )}
          </Carousel>
        </Box>
      </Box>
    );
  }
  return <></>;
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
