import React, { Fragment } from "react";
import Coupon from "../components/Coupon";
import Nametype from "../components/Nametype";
import { makeStyles } from "@mui/styles";

const Promotion = () => {
    const classes = useStyles();
  return (
    <>

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
    </>
  );
};

const useStyles = makeStyles({
  
  });

export default Promotion;
