import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CouponPic from "~/common/assets/images/voucher-pic.png";
import CButton from "~/common/components/CButton";
import BorderLinearProgress from "~/common/components/BorderLinearProgress";
import Couponshop from "./Couponshop";

const Coupon = ({ coupon, claimProps = { title: "Claim", idx: "idx" } }) => {
  const classes = useStyles();
  const [currentCoupon, setCurrentCoupon] = useState(coupon.remaining);
  const handleClaim = () => {
    setCurrentCoupon(currentCoupon - 1);
  };
  let apiUrl = "http://localhost:8080/promotion/";
  const [post, setPost] = useState(null);

  function shop() {
    axios
      .post(apiUrl + "upshop", {
        id: id,
        userId: userId,
      })
      .then((response) => {
        setPost(response.data);
      });
    console.log(id, userId);
  }

  return (
    <Box className={classes.couponbox}>
      <img
        src={coupon.CouponPic || CouponPic}
        width="150px"
        alt="coupon picture"
      />

      <Box className={classes.text}>
        <Typography sx={titleStyle}> {coupon.title} </Typography>
        <BorderLinearProgress
          variant="determinate"
          customColor="#FD6637"
          currentCoupon={currentCoupon}
          value={Math.ceil(100 * (currentCoupon / coupon.remaining))}
          sx={{ margin: "10px 0" }}
        />
        <Typography sx={remainStyle}>
          Remaining Voucher: {currentCoupon}
        </Typography>
        <Typography sx={expireStyle}>Expiring: {coupon.valid}</Typography>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box sx={{ marginLeft: "30px" }}>
        <CButton {...claimProps} onClick={handleClaim} />
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      {/* </Card> */}
    </Box>
  );
};

export default Coupon;
