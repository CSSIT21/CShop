import { Box } from "@mui/system";
import React, { Fragment } from "react";
import Couponshop from "../components/Couponshop";
import Showpic from "../components/Showpic";
const Promotion = () => {
  return (
    <Box sx={{ backgroundColor: "wheat", display:'flex', flexFlow:'row wrap', alignItems:'baseline',width:'100%' }}>
      <Showpic/>
      <Couponshop/>
    </Box>
  );
};



export default Promotion;
