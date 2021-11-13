import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CouponPic from "~/common/assets/images/voucher-pic.png";
import CButton from "~/common/components/CButton";
import BorderLinearProgress from "~/common/components/BorderLinearProgress";
import { noop } from "~/common/utils";
import couponshops from "./Couponshop";

const Coupon = ({
  coupon,
  totalCoupon = 1,
  currentCoupon = 0,
  setCoupon = noop,
  claimProps = { title: "Claim" },
}) => {
  const classes = useStyles();

  useLayoutEffect(() => {
    if (currentCoupon > totalCoupon) setCoupon(totalCoupon);
  }, [currentCoupon]);

  return (
    <Box className={classes.couponbox}>
      <img src={CouponPic} width="150px" alt="coupon picture" />

      <Box className={classes.text}>
        <Typography sx={titleStyle}> {couponshops.title} </Typography>
        <BorderLinearProgress
          variant="determinate"
          customColor="pink"
          value={Math.ceil(100 * (currentCoupon / totalCoupon))}
          sx={{ margin: "10px 0" }}
        />
        <Typography sx={remainStyle}>
          Remaining Voucher: {couponshops.remaining}
        </Typography>
        <Typography sx={expireStyle}>Expiring: {couponshops.valid}</Typography>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box sx={{marginLeft: "30px"}}>
      <CButton {...claimProps} />
      </Box>
      
    </Box>
  );
};

const useStyles = makeStyles({
  couponbox: {
    margin: '0px auto',
    maxWidth: "50%",
    padding: "15px",

    display: "flex",
    alignItems: "center",

    borderRadius: "15px",
    backgroundColor: "white",
  },

  text: {
    width: "300px",
    padding: "0 20px",
  },
});

const titleStyle = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#FD6637",
};

const remainStyle = {
  fontSize: "12px",
  fontWeight: 500,
};

const expireStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#FD6637",
};

export default Coupon;