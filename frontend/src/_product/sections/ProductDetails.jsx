import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Mainpic from "../components/Image";
import AddToCartButton from "../../common/components/CButton";
import Amount from "../components/AmountField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";

const ProductDetails = (props) => {
  const productName = "Product Name";
  const productDetail = "Product Detail";
  const price = "500";
  const stock = "20";

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
      setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "50px"
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
          {productName}
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            lineHeight: "36px",
            color: "#A0A3BD",
          }}
        >
          {productDetail}
        </Typography>
        <Typography
          sx={{
            fontSize: "36px",
            lineHeight: "54px",
            color: "#FD6637",
            marginTop: "20px",
          }}
        >
          {price} B.
        </Typography>
        {/*Button*/}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "70px" }}>
          <Amount stock={stock} />
          <Box sx={{ marginLeft: "20px" }}>
            <AddToCartButton
              title="Add to cart"
              icon={<ShoppingCartOutlinedIcon />}
              width="200px"
              height="56px"
              onClick={handleClickOpen}
              sx={{ marginLeft: "0px" }}
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
            {stock}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};



export default ProductDetails;
