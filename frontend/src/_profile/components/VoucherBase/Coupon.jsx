import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CouponPic from "../../assets/voucher-pic.png";

const Coupon = ({ coupon }) => {
  const classes = useStyles();

  return (
    <Box className={classes.couponbox}>
      <Box className={classes.box}>
        <img src={CouponPic} alt="pic" />
        <Box className={classes.text}>
          <Box className={classes.text1}>{coupon.title}</Box>
          <Box className={classes.text2}>Detail</Box>
          <Box className={classes.text3}>{coupon.detail}</Box>
          <Box className={classes.text4}>Valid</Box>
          <Box className={classes.text5}>{coupon.valid}</Box>
        </Box>
      </Box>
    </Box>
  );
};
const useStyles = makeStyles({
  couponbox: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: "50px",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    width: "50%",
    justifyContent: "space-between",
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    margin: "15px",
  },
  text1: {
    color: "#FD6637",
    fontWeight: "600",
    fontSize: "25px",
  },
  text2: {
    color: "#FD6637",
    fontWeight: "500",
  },
  text3: {
    fontWeight: "500",
    marginBottom: "10px",
  },
  text4: {
    color: "#FD6637",
    fontWeight: "500",
  },
});
export default Coupon;
