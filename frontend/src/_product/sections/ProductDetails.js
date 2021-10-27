import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import pic1 from "../../common/assets/images/iphone-black.png";
import Typography from "@mui/material/Typography";
import Mainpic from "../components/Image";
import AddToCartButton from "../../common/components/CButton";
import Amount from "../components/AmountField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";

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
    setOpen(false);
  };

<<<<<<< Updated upstream
  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
=======
    const handleClickOpen = () => {
        setOpen(true);
    };
>>>>>>> Stashed changes

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/*displayImage*/}
      <Box>
        <Mainpic />
      </Box>
      {/*ProductDetail*/}
      <Box sx={{ margin: "0 90px" }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: "36px", lineHeight: "54px" }}
        >
          {ProductName}
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            lineHeight: "36px",
            color: "#A0A3BD",
          }}
        >
          {ProductDetail}
        </Typography>
        <Typography
          sx={{
            fontSize: "36px",
            lineHeight: "54px",
            color: "#FD6637",
            marginTop: "20px",
          }}
        >
          {Price}
        </Typography>
        {/*Button*/}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "70px" }}>
          <Amount />
          <Box sx={{ marginLeft: "20px" }}>
            <AddToCartButton
              title="Add to cart"
              icon={<ShoppingCartOutlinedIcon />}
              width="211px"
              height="56px"
              onClick={handleClickOpen}
              style={{ marginLeft: "20px" }}
            />
            <ConfirmDialogs
              text="The item already added in the cart"
              open={open}
              handleClose={handleClose}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", marginTop: "20px" }}>
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
      </Box>
    </Box>
  );
};

var proImg = document.getElementById("photo");
const changeImage1 = (event) => {
  proImg = { pic1 };
};

export default ProductDetails;
