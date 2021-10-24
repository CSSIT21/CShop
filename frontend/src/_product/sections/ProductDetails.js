import React from "react";
import { makeStyles } from "@mui/styles";
import img1 from "../../img/iphone-black.png";
import img2 from "../../img/iphone-blue.png";
import img3 from "../../img/iphone-pink.png";
import img4 from "../../img/iphone-red.png";
import Amount from "../components/AmountField";
import { borderRadius } from "@mui/system";

const ProductDetails = () => {
  const classes = useStyles();
  return (
    <div className={classes.productDetail}>
      <div className={classes.thumbImg}>
        <div className={classes.sideImage} onClick={changeImage1()}>
          <img className={classes.imgProduct} src={img1} alt="thumb"></img>
        </div>
        <div className={classes.sideImage} onClick={changeImage1()}>
          <img className={classes.imgProduct} src={img2} alt="thumb"></img>
        </div>
        <div className={classes.sideImage} onClick={changeImage1()}>
          <img className={classes.imgProduct} src={img3} alt="thumb"></img>
        </div>
        <div className={classes.sideImage} onClick={changeImage1()}>
          <img className={classes.imgProduct} src={img4} alt="thumb"></img>
        </div>
      </div>
      <div className={classes.mainImage}>
        <img
          className={classes.mainImgProduct}
          src={img1}
          id="photo"
          class="pro-img"
          alt="product"
        ></img>
      </div>
      <div className={classes.productName}>
        <div className={classes.name}>Product Name</div>
        <div className={classes.detail}>Product Detail</div>
        <div className={classes.price}>500 B.</div>
        <div className={classes.amountAndCart}>
          {/* <Amount /> */}
          <div className={classes.cart}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

var proImg = document.getElementById("photo");
const changeImage1 = (event) => {
  proImg = { img2 };
};

const useStyles = makeStyles({
  sideImage: {
    width: "116px",
    height: "116px",
    border: "1px solid #EFF0F6",
    margin: "12px",
    borderRadius: "10px",
    backgroundColor: "#EFF0F6",
    cursor: "pointer",
  },
  imgProduct: {
    maxWidth: "100%",
    maxHeight: "100%",
    paddingLeft: "8px",
    display: "block",
  },
  thumbImg: {
    top: "-0.9px",
  },
  mainImage: {
    width: "512px",
    height: "512px",
    border: "1px solid #EFF0F6",
    borderRadius: "10px",
    backgroundColor: "#EFF0F6",
    left: "132px",
    top: "8px",
  },
  mainImgProduct: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  productDetail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "50px 0px",
    width: "1201px",
    height: "568px",
    left: "100px",
    top: "195px",
  },
  name: {
    width: "261px",
    height: "54px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "36px",
    lineHeight: "54px",
  },
  detail: {
    width: "169px",
    height: "36px",
    left: "0px",
    top: "54px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
    lineHeight: "36px",
    color: "#A0A3BD",
  },
  price: {
    width: "108px",
    height: "54px",
    left: "0px",
    top: "106px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "36px",
    lineHeight: "54px",
    color: "#FD6637",
  },
  productName: {
    width: "347px",
    height: "314px",
    left: "734px",
    top: "50px",
    flex: "none",
    order: "1",
    flexGrow: "0",
    margin: "0px 90px",
  },
  amountAndCart: {
    display: "flex",
  },
  cart: {
    width: "211px",
    height: "44px",
    left: "136px",
    top: "239px",
    background: "#FD6637",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    marginLeft: "30px",
  },
});

export default ProductDetails;
