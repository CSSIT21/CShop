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
import OptionsChip from "../components/ProductDetailsBase/OptionsChip";
import Button from "@mui/material/Button";

const ProductDetails = ({
  copyLink,
  productDetails,
  opt = {
    name: "Color",
    options: [
      { id: 1, name: "Red", enable: false },
      { id: 2, name: "Greensadsdsadsd", enable: false },
      { id: 3, name: "Yellowdsadsdad", enable: false },
      { id: 4, name: "Pink", enable: false },
      { id: 5, name: "Bluedsaddsadsad", enable: false },
      { id: 6, name: "Black", enable: false },
    ],
  },
  // opt,
  cho = {
    name: "Size",
    choices: [
      { id: 1, name: "XS", enable: false },
      { id: 2, name: "S", enable: false },
      { id: 3, name: "M", enable: false },
      { id: 4, name: "L", enable: false },
      { id: 5, name: "XL", enable: false },
      { id: 6, name: "XXL", enable: false },
    ],
  },
  // cho,
}) => {
  const [product, setProduct] = useState({
    details: {
      id: 0,
      title: "CheesePizzaverydiliciousCheese Pizza very dilic1234567890",
      price: "500",
      status: "Hot sale",
      favourite: true,
      sub_title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitatione",
      quantity: 0,
    },
    favorite: true,
  });

  const [options, setOptions] = useState(opt);
  const [choices, setChoices] = useState(cho);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [optionCheck, setOptionCheck] = useState(false);
  const [choiceCheck, setChoiceCheck] = useState(false);

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    // CHECK optionCheck, choiceChek
    setOpen(true);
  };

  const onFavourite = () => {
    setProduct({ ...product, favourite: !product.favourite });
  };

  const handleClickOption = (e) => {
    const changedOptions = options.options.map((el) =>
      el.id == e.id ? { ...el, enable: !el.enable } : { ...el, enable: false }
    );
    setOptions({ ...options, options: changedOptions });
    setOptionCheck(!optionCheck);
    console.log(options);
  };
  const handleClickChoice = (e) => {
    const changedChoices = choices.choices.map((el) =>
      el.id == e.id ? { ...el, enable: !el.enable } : { ...el, enable: false }
    );
    setChoices({ ...choices, choices: changedChoices });
    setChoiceCheck(!choiceCheck);
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
      <Box sx={{ margin: "0 60px" }}>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "26px",
            lineHeight: "36px",
            marginBottom: "5px",
          }}
        >
          {product.details.title.slice(0, 50)}
          {product.details.title.length > 50 ? "..." : ""}
        </Typography>
        <Box sx={boxShareLike}>
          <Box>
            <IconButton onClick={copyLink}>
              <ShareIcon sx={{ color: "#A0A3BD", fontSize: "22px" }} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                onFavourite(product);
              }}
              sx={{
                fontWeight: "bold",
                fontSize: "22px",
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
            fontSize: "18px",
            lineHeight: "26px",
            color: "#A0A3BD",
            marginTop: "10px",
          }}
        >
          {product.details.sub_title}
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            lineHeight: "36px",
            color: "#FD6637",
            margin: "28px 0 0 0",
          }}
        >
          {product.details.price} B.
        </Typography>

        {/* options */}
        {opt && (
          <Box sx={optionStyle}>
            <OptionsChip
              handleClick={handleClickOption}
              list={options.options}
              name={options.name}
            />
          </Box>
        )}

        {/* choice */}
        {cho && (
          <Box sx={optionStyle}>
            <OptionsChip
              handleClick={handleClickChoice}
              list={choices.choices}
              name={choices.name}
            />
          </Box>
        )}

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
          <Amount count={count} setCount={setCount} stock={product.quantity} />
          <Box sx={{ marginLeft: "15px" }}>
            <Button
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={handleClickOpen}
              style={{
                width: "190px",
                height: "38px",
                textTransform: "capitalize",
              }}
              fontSize="12px"
              variant="contained"
              disabled={(product.details.quantity = 0) ? false : true}
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
            {product.details.quantity == 0
              ? "Out of stock"
              : product.details.quantity}
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
