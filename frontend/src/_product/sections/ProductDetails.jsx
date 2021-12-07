import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DisplayImage from "../components/ProductDetailsBase/Image";
import AddToCartButton from "../../common/components/CButton";
import Amount from "../components/ProductDetailsBase/AmountField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";
import ShareIcon from "@mui/icons-material/ShareRounded";
import IconButton from "@mui/material/IconButton";
import {
  FavoriteRounded as FavoriteRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
} from "@mui/icons-material";

const ProductDetails = () => {
  const [product, setProduct] = useState({
    id: 0,
    title: "Cheese Pizza very อร่อย มากๆๆๆ",
    price: "500",
    status: "Hot sale",
    favourite: true,
  });

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

  const onFavourite = () => {
    setProduct({ ...product, favourite: !product.favourite });
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "50px",
      }}
    >
      {/*displayImage*/}
      <Box>
        <DisplayImage />
      </Box>
      {/*ProductDetail*/}
      <Box sx={{ margin: "0 90px" }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: "36px", lineHeight: "54px" }}
        >
          {productName}
        </Typography>
        <Box sx={boxShareLike}>
          <Box>
            <IconButton>
              <ShareIcon sx={{ color: "#A0A3BD", fontSize: "28px" }} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                onFavourite(product);
              }}
              sx={{
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              {product.favourite ? (
                <FavoriteRoundedIcon
                  sx={{ color: "#A0A3BD" }}
                  fontSize="inherit"
                />
              ) : (
                <FavoriteBorderRoundedIcon
                  sx={{ color: "#A0A3BD" }}
                  fontSize="inherit"
                />
              )}
            </IconButton>
          </Box>
        </Box>
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

const boxShareLike = {
  display: "flex",
  width: "475px",
  height: "40px",
  alignItems: "center",
  justifyContent: "flex-end",
  margin: "0 0 1px 0",
};
export default ProductDetails;
