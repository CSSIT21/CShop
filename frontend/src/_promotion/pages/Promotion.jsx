import { Box } from "@mui/system";
import React, { Fragment } from "react";
import Coupon from "../components/Coupon";
import Nametype from "../components/Nametype";
import Couponshop from "../components/Couponshop";
// import Showpic from "../components/Showpic";
const Promotion = () => {
  return (
    <Box sx={{ backgroundColor: "wheat" }}>
      {/* <Showpic/> */}
      <Nametype name="Shop" color="orange" />

      <Couponshop />

   
    </Box>
  );
};

// const useStyles = makeStyles({
//   wrapper: {
//     marginBottom: "40px",
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "40px",
//   },

//   content: {
//     width: "100%",
//     padding: "30px",
//     boxSizing: "border-box",
//     backgroundColor: "#FDF4DD",
//     borderRadius: "15px",
//   },
// });

export default Promotion;
