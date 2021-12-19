import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DisplayImage from "../components/ProductDetailsBase/Image";
import Amount from "../components/ProductDetailsBase/AmountField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/system";
import ConfirmDialogs from "~/common/components/ConfirmDialogs";
import ShareIcon from "@mui/icons-material/ShareRounded";
import IconButton from "@mui/material/IconButton";
import OptionsChip from "../components/ProductDetailsBase/OptionsChip";
import Button from "@mui/material/Button";
import pic1 from "~/common/assets/images/iphone-black.png";
import pic2 from "~/common/assets/images/iphone-blue.png";
import pic3 from "~/common/assets/images/iphone-pink.png";
import pic4 from "~/common/assets/images/iphone-red.png";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
const ProductDetails = ({
  auth,
  copyLink,
  productDetails,
  options,
  setOptions,
  productPictures,
  favorite,
  setFavorite,
}) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState({});

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleAddToCart = () => {
    // CHECK optionCheck, choiceChek
    if (auth.isLoggedIn) {
      // axios from Plume
      setOpen(true);
    } else location.href = "http://localhost:3000/register";
  };

  const onFavourite = () => {
    if (auth.isLoggedIn) {
      // axios from JIW
      setProduct({ ...product, favourite: !product.favourite });
    } else location.href = "http://localhost:3000/register";
  };

  const handleClickChoice = (e) => {
    setSelected((selected) => ({ ...selected, [e.product_options_id]: e.id }));
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
        {productPictures ? (
          <DisplayImage productPictures={productPictures} />
        ) : (
          <DisplayImage
            productPictures={[
              {
                id: "pic1",
                path: pic1,
              },
              {
                id: "pic2",
                path: pic2,
              },
              {
                id: "pic3",
                path: pic3,
              },
              {
                id: "pic4",
                path: pic4,
              },
            ]}
          />
        )}
      </Box>
      <Box sx={{ margin: "0 60px" }}>
        {productDetails?.title && (
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "26px",
              lineHeight: "36px",
              marginBottom: "5px",
            }}
          >
            {productDetails?.title.slice(0, 120)}
            {productDetails?.title.length > 50 ? "..." : ""}
          </Typography>
        )}
        <Box sx={boxShareLike}>
          <Box>
            <IconButton onClick={copyLink}>
              <ShareIcon sx={{ color: "#A0A3BD", fontSize: "22px" }} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                setFavorite(!favorite);
                console.log(favorite);
                // e.preventDefault();
                // onFavourite(productDetails?);
              }}
              sx={{
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {favorite ? (
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
            fontSize: "18px",
            lineHeight: "26px",
            color: "#A0A3BD",
            marginTop: "10px",
          }}
        >
          {productDetails?.sub_title}
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            lineHeight: "36px",
            color: "#FD6637",
            margin: "28px 0 0 0",
          }}
        >
          {productDetails?.price} B.
        </Typography>

        {/* options */}
        {options &&
          options.map((e, key) => (
            <Box sx={optionStyle} key={key}>
              <OptionsChip
                handleClick={handleClickChoice}
                list={e.product_choices}
                name={e.name}
                selected={selected}
              />
            </Box>
          ))}

        {/*Button*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            width: "300px",
          }}
        >
          <Amount
            count={count}
            setCount={setCount}
            stock={productDetails?.quantity}
          />
          <Box sx={{ marginLeft: "15px" }}>
            <Button
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleAddToCart}
              style={{
                width: "190px",
                height: "38px",
                textTransform: "capitalize",
              }}
              fontSize="12px"
              variant="contained"
              disabled={
                productDetails?.quantity == 0 ||
                options?.length != Object.keys(selected).length
                  ? true
                  : false
              }
            >
              Add to cart
            </Button>
            <ConfirmDialogs
              text="The item already added in the cart"
              open={open}
              handleClose={handleClickClose}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", marginTop: "12px", fontSize: "16px" }}>
          <Typography sx={stockStyle}>Stock:</Typography>
          <Typography sx={stockStyle}>
            {productDetails?.quantity == 0
              ? "Out of stock"
              : productDetails?.quantity}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const boxShareLike = {
  display: "flex",
  width: "425px",
  height: "30px",
  alignItems: "center",
  justifyContent: "flex-end",
  margin: "0 0 0px 0",
};
const optionStyle = {
  margin: "20px 0 0px 0",
  width: "375px",
};
const stockStyle = {
  color: "#A0A3BD",
  marginLeft: "5px",
};
export default ProductDetails;
