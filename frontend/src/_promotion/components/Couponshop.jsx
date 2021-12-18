import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Coupon from "./Coupon";
import p1 from "../picture/unsplash_23coWmkTNSg.png";
import p2 from "../picture/unsplash_FoeIOgztCXo.png";
import p3 from "../picture/unsplash_lbqZUefMLvQ.png";
import axios from "axios";

const couponshops = [
  {
    id: 1,
    title: "50% save for new user!!",
    remaining: 2,
    valid: "Until 31/12/2021",
    claimed: false,
    type: "shop",
  },
  {
    id: 2,
    title: "50% save for new user!!",
    remaining: 10,
    valid: "Until 31/12/2021",
    claimed: false,
    type: "app",
  },
  {
    id: 3,
    title: "50% save for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    type: "reward",
  },
  {
    id: 4,
    title: "50% save for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    type: "event",
  },
  {
    id: 5,
    title: "50% save 2 items from Beauty",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    CouponPic: p2,
    type: "category",
  },
  {
    id: 6,
    title: "1+1 in Electronic Category",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    CouponPic: p1,
    type: "category",
  },
  {
    id: 7,
    title: "50% save for new user!!",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    type: "shop",
  },
  {
    id: 8,
    title: "First buy in Kids Category",
    remaining: 5,
    valid: "Until 31/12/2021",
    claimed: false,
    CouponPic: p3,
    type: "category",
  },
];

const Couponshop = () => {
  const classes = useStyles();
  let apiUrl = "http://localhost:8080/promotion"; 
  
  const [post,setPost] = useState();

  const getshowCode = () => {
    axios.get(`${apiUrl}/showcode`).then(({data}) => {      
       return setPost(data);
     })
     .catch((err) => {
      return console.log(err.message);
     })
   };
  
   useEffect(() => {
    getshowCode();
   }, [])
   console.log(post);

  return (
    <Box className={classes.wrapper}>
      <box className={classes.boxtype} style={{ backgroundColor: "#a5cd4c" }}>
        <Typography fontWeight={500} fontSize="24px" className={classes.type}>
          Event
        </Typography>
      </box>
      <Box className={classes.content}>
        {couponshops.filter((item) => item.type === "event").map((coupon, idx) => {
            return (
              <Coupon
                key={idx}
                coupon={coupon}
                claimProps={{
                  disabled: coupon.claimed,
                  title: "Claim",
                }}
              />
            );
          })}
      </Box>
      <box className={classes.boxtype} style={{ backgroundColor: "#00BF9D" }}>
        <Typography fontWeight={500} fontSize="24px" className={classes.type}>
          Special Shop Discount
        </Typography>
      </box>
      <Box className={classes.content}>
        {couponshops.filter((item) => item.type === "shop").map((coupon, idx) => {
            return (
              <Coupon
                key={idx}
                coupon={coupon}
                claimProps={{
                  disabled: coupon.claimed,
                  title: "Claim",
                }}
              />
            );
          })}
      </Box>
      <box className={classes.boxtype} style={{ backgroundColor: "#FD6637" }}>
        <Typography fontWeight={500} fontSize="24px" className={classes.type}>
          App
        </Typography>
      </box>
      <Box className={classes.content}>
        {couponshops.filter((item) => item.type === "app").map((coupon, idx) => {
            return (
              <Coupon
                key={idx}
                coupon={coupon}
                claimProps={{
                  disabled: coupon.claimed,
                  title: "Claim",
                }}
              />
            );
          })}
      </Box>
      <box className={classes.boxtype} style={{ backgroundColor: "#514EFF" }}>
        <Typography fontWeight={500} fontSize="24px" className={classes.type}>
          Category Discount
        </Typography>
      </box>
      <Box className={classes.content}>
        {couponshops.filter((item) => item.type === "category").map((coupon, idx) => {
            return (
              <Coupon
                key={idx}
                coupon={coupon}
                claimProps={{
                  disabled: coupon.claimed,
                  title: "Claim",
                }}
              />
            );
          })}
      </Box>
      <box className={classes.boxtype} style={{ backgroundColor: "#f4af54" }}>
        <Typography fontWeight={500} fontSize="24px" className={classes.type}>
          Reward
        </Typography>
      </box>
      <Box className={classes.content}>
        {couponshops.filter((item) => item.type === "reward").map((coupon, idx) => {
            return (
              <Coupon
                key={idx}
                coupon={coupon}
                claimProps={{
                  disabled: coupon.claimed,
                  title: "Claim",
                }}
              />
            );
          })}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  wrapper: {
    marginBottom: "40px",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    alignItems: "center",
    marginLeft: "15%",
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
    justifyContent: "center",
  },

  type: {
    alignSelf: "flex-start",
  },

  boxtype: {
    padding: "12px 12px 12px 12px",
    flexDirection: "column",
    color: "white",
    backgroundColor: "#00BF9D;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "450px",
    alignSelf: "flex-start",
    height: "60px",
    marginBottom: "1%",
    marginTop: "5%",
  },
});

export default Couponshop;
