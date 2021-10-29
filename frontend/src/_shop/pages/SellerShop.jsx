import React from "react";
import Header from "../components/sellerShopBase/Header";
import TabsController from "../components/sellerShopBase/TabsController";
import Voucher from "../components/sellerShopBase/Voucher";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const SellerShop = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Header />
          <TabsController />
            <Box>
              <Voucher />
            </Box>
        </Box>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  body:{
    display:"flex",
    justifyContent:"center",
    width:"100%",
    marginTop: "20px",
  },
  container:{
    flexDirection:"column",
    alignItems:"center",

    width:"92%",
  }
})
export default SellerShop;
