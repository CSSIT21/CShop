import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CouponPic from "~/common/assets/images/voucher-pic.png";
import CButton from "~/common/components/CButton";
import { noop } from "~/common/utils";

const VoucherCard = ({
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
      <img src={CouponPic} style={{width: '5vw'}} alt="coupon picture" />

      <Box className={classes.text}>
        <Typography sx={titleStyle}> {coupon.title} </Typography>
        <Typography sx={expireStyle}>Expiring: {coupon.valid}</Typography>
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
    maxWidth: "100%",
    padding: "15px",

    display: "flex",
    alignItems: "center",

    borderRadius: "15px",
    backgroundColor: "white",
  },

  text: {
    width: "280px",
    padding: "0 20px",
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: "-30px"
  },
});

const titleStyle = {
  fontSize: "22px",
  fontWeight: 600,
  color: "black",
  
};

const remainStyle = {
  fontSize: "12px",
  fontWeight: 500,
};

const expireStyle = {
  fontSize: "15px",
  fontWeight: 500,
  color: "#FD6637",
};

export default VoucherCard;
