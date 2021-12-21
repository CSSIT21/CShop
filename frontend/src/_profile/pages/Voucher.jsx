import TopProfile from "../components/TopProfile";
import Coupon from "../components/VoucherBase/Coupon";
import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { For } from "~/common/utils";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";
import CouponPic from '~/common/assets/images/voucher-pic2.png';

const couponsevent = [
  {
    title: "event",
    detail: "This coupon can be use to have 50% discount",
    valid: "Until 31/12/2021",
    pic: "https://sanookwifi.com/storage/2019/11/Promotion_11.11-1024x1024.png"
  }
];
const couponscategory = [
  {
    title: "category",
    detail: "This coupon can be use 3 day",
    valid: "Until 31/12/2021",
    pic: "https://media.discordapp.net/attachments/843125481389424640/909131606680281128/unsplash_FoeIOgztCXo.png"
  },
  {
    title: "category",
    detail: "This coupon can be use 3 day",
    valid: "Until 31/12/2021",
    pic: "https://media.discordapp.net/attachments/843125481389424640/909131590544789544/unsplash_23coWmkTNSg.png"
  }
];
const couponsreward = [
  {
    title: "reward",
    detail: "50% discount from Beauty Category",
    valid: "Until 31/12/2021",
    pic: "https://pbs.twimg.com/profile_images/1403166048996642819/G50KbiqY_400x400.jpg"
  },
  {
    title: "reward",
    detail: "50% discount from Beauty Category",
    valid: "Until 31/12/2021",
    pic: "https://cf.shopee.co.th/file/13087f34b6c97eae9abb70a59a3d793a"
  }
];
const couponsshop = [
  {
    title: "Discount  20%",
    detail: "This coupon can be use to Electronic Category",
    valid: "Until 31/12/2021",
    pic: "https://pbs.twimg.com/profile_images/1068192031153868800/Y-5gyvsP_400x400.jpg"
  },
  {
    title: "shop",
    detail: "This coupon can be use to Electronic Category",
    valid: "Until 31/12/2021",
    pic: "https://pbs.twimg.com/profile_images/1068192031153868800/Y-5gyvsP_400x400.jpg"
  }
];
const couponsapp = [
  {
    title: "app",
    detail: "This coupon can use only day",
    valid: "Until 31/12/2021",
    pic: CouponPic
  },

];

const VoucherPage = (props) => {
  const classes = useStyles();
  const [addCouponCode, setaddCouponCode] = useState("");
  return (
    <>
      <TopProfile />
      <Box className={classes.background}>
        <Box className={classes.header}>Voucher & Coupon</Box>
        <Box className={classes.codeField}>
          <Box className={classes.textFieldBox} style={{ marginRight: "10px" }}>
            
        
          </Box>
          
        </Box>
        
        <Box>
        <Box className={classes.couponShop}>Special Shop Discount</Box>
        <Box className={classes.couponCard}>
          <For each={couponsshop}> 
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
        </Box>

        <Box>
        <Box className={classes.couponCategory}>Categories Discount</Box>
        <Box className={classes.couponCard}>
          <For each={couponscategory}>
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
        </Box>

        <Box>
        <Box className={classes.couponApp}>App Discount</Box>
        <Box className={classes.couponCard}>
          <For each={couponsapp}>
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
        </Box>

        <Box>
        <Box className={classes.couponReward}>Reward Discount</Box>
        <Box className={classes.couponCard}>
          <For each={couponsreward}>
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
        </Box>

        <Box>
        <Box className={classes.couponEvent}>Event Discount</Box>
        <Box className={classes.couponCard}>
          <For each={couponsevent}>
            {(item, idx) => <Coupon key={idx} coupon={item} />}
          </For>
        </Box>
        </Box>

       
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  background: {
    backgroundColor: "#FDF4DD",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  couponCard: {
    backgroundColor: "#FDF4DD",
    marginButtom: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom : "30px"
  },
  couponShop:{
    padding: "10px 10px 10px 24px",
    top:"410px",
    display: "flex",
    flexDirection: "column",
    fontFamily:"Poppins",
    fontSize:"32px",
    fontWeight:"450px",
    color:"white",
    backgroundColor: "#00BF9D;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "453px",
    height:"68px",
    marginBottom : "30px"
  },
  couponCategory:{
    padding: "10px 10px 10px 24px",
    top:"410px",
    display: "flex",
    flexDirection: "column",
    fontFamily:"Poppins",
    fontSize:"32px",
    fontWeight:"450px",
    color:"white",
    backgroundColor: "#514EFF;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "453px",
    height:"68px",
    marginBottom : "30px",
  },
  couponApp:{
    padding: "10px 10px 10px 24px",
    top:"410px",
    display: "flex",
    flexDirection: "column",
    fontFamily:"Poppins",
    fontSize:"32px",
    fontWeight:"450px",
    color:"white",
    backgroundColor: "#FB4B7F;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "453px",
    height:"68px",
    marginBottom : "30px"
  },
  couponReward:{
    padding: "10px 10px 10px 24px",
    top:"410px",
    display: "flex",
    flexDirection: "column",
    fontFamily:"Poppins",
    fontSize:"32px",
    fontWeight:"450px",
    color:"white",
    backgroundColor: "#f4af54;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "453px",
    height:"68px",
    marginBottom : "30px"
  },
  couponEvent:{
    padding: "10px 10px 10px 24px",
    top:"410px",
    display: "flex",
    flexDirection: "column",
    fontFamily:"Poppins",
    fontSize:"32px",
    fontWeight:"450px",
    color:"white",
    backgroundColor: "#a5cd4c;",
    alignItems: "flex-start",
    borderRadius: "0 20px 20px 0",
    width: "453px",
    height:"68px",
    marginBottom : "30px"
  },
  header: {
    backgroundColor: "#FDF4DD",
    display: "flex",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "50px",
    color:"black",
    margintop: "10px",
  },
  codeField: {
    backgroundColor: "#FDF4DD",
    height:"100px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  textFieldBox: {
    marginBottom: "60px",
    backgroundColor: "#FDF4DD",
    borderRadius: "10px",
    width: "25%",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
  },
});
export default VoucherPage;
