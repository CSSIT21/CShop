import { Fragment } from "react";

import Coupon from "../components/Coupon";
import Nametype from "../components/Nametype";
import { makeStyles } from "@mui/styles";

import Couponshop from "../components/Couponshop";
import Showpic from "../components/Showpic";

const Promotion = () => {
  const classes = useStyles();
  return (
    <>
      <div></div>
      <div class="main-content">
        <div class="slide">
          <figure>
            <h1>image</h1>
          </figure>
        </div>
      </div>

      <Nametype name="Shop" />
      <Coupon
        namepro="50% save for new user!!"
        detail="This coupon can be use to have 50% discount"
        date="31/12/2021"
      />

      <Coupon
        namepro="50% save for new user!!"
        detail="This coupon can be use to have 50% discount"
        date="31/12/2021"
      />

      <Nametype name="App" />
      <Coupon
        namepro="50% save for new user!!"
        detail="This coupon can be use to have 50% discount"
        date="31/12/2021"
      />

      <Coupon
        namepro="50% save for new user!!"
        detail="This coupon can be use to have 50% discount"
        date="31/12/2021"
      />

      <Nametype name="Event" />
      <Coupon
        namepro="50% save for new user!!"
        detail="This coupon can be use to have 50% discount"
        date="31/12/2021"
      />
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "baseline",
          width: "100%",
        }}
      >
        <Showpic />
        <Couponshop />
      </Box>
    </>
  );
};

const useStyles = makeStyles({});

export default Promotion;
