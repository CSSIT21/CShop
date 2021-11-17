import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CouponPic from "~/common/assets/images/voucher-pic.png";
import CButton from "~/common/components/CButton";
import BorderLinearProgress from "~/common/components/BorderLinearProgress";



const Coupon = ({coupon,claimProps = { title: "Claim", idx: 'idx'},}) => {
  const classes = useStyles();
  const [currentCoupon, setCurrentCoupon] = useState(coupon.remaining);
  const handleClaim = () => {
    setCurrentCoupon(currentCoupon - 1);
  };
  


  return (
    <Box className={classes.couponbox}>
      <img src={ coupon.CouponPic || CouponPic } width="150px" alt="coupon picture"/>
         
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
      <Box sx={{marginLeft: "30px"}}>
      <CButton {...claimProps} onClick={handleClaim}/>
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

    marginBottom: '1%',
    marginTop: '1%'
  },

  text: {
    width: "300px",
    padding: "0 20px",
  },
});

const titleStyle = {
  fontSize: "18px",
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