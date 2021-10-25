import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import img1 from "../../img/iphone-black.png";
import img2 from "../../img/iphone-blue.png";
import img3 from "../../img/iphone-pink.png";
import img4 from "../../img/iphone-red.png";
import Typography from "@mui/material/Typography";
import ImageDetail from "../components/SideImg.js";
import Mainpic from "../components/Image";
import AddToCartButton from "../../common/components/CButton";
import Amount from "../components/AmountField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, style } from "@mui/system";

import { CSSTransition } from "react-transition-group";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DialogPop from "../components/Dialog";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const ProductDetails = (props) => {
  const ProductName = "Product Name";
  const ProductDetail = "Product Detail";
  const Price = "500 B.";
  const Stock = "25";

  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      setShow(true);
    }, 3000);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();
  return (
    <div className={classes.productDetail}>
      <div className={classes.thumbImg}>
        <ImageDetail img={img1} />
        <ImageDetail img={img2} />
        <ImageDetail img={img3} />
        <ImageDetail img={img4} />
      </div>
      <Mainpic img={img1} />
      <div className={classes.productName}>
        <Typography
          sx={{
            width: "261px",
            height: "54px",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "36px",
            lineHeight: "54px",
          }}
        >
          {ProductName}
        </Typography>
        <Typography
          sx={{
            width: "169px",
            height: "36px",
            left: "0px",
            top: "54px",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "24px",
            lineHeight: "36px",
            color: "#A0A3BD",
          }}
        >
          {ProductDetail}
        </Typography>
        <Typography
          sx={{
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
          }}
        >
          {Price}
        </Typography>
        <div className={classes.containButton}>
          <Amount />
          <div className={classes.amountAndCart}>
            <AddToCartButton
              title="Add to cart"
              icon={<ShoppingCartOutlinedIcon />}
              width="211px"
              height="44px"
              onClick={handleClickOpen}
            />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogPop />
            </Dialog>
          </div>
        </div>
        <Box sx={{ display: "flex", marginTop: "10px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#A0A3BD",
              marginLeft: "4px",
            }}
          >
            Stock:
          </Typography>
          <Typography
            sx={{ fontSize: "18px", marginLeft: "5px", color: "#A0A3BD" }}
          >
            {Stock}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

var proImg = document.getElementById("photo");
const changeImage1 = (event) => {
  proImg = { img2 };
};

const useStyles = makeStyles({
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
  containButton: {
    width: "500px",
    height: "44px",
    display: "flex",
  },
  amountAndCart: {
    left: "136px",
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
