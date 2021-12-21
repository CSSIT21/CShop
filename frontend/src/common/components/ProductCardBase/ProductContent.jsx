import {
  FavoriteRounded as FavoriteRoundedIcon,
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import {
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import { isFunc, isUndef } from "~/common/utils/index";
import CButton from "~/common/components/CButton";

const ProductContent = ({
  product,
  status,
  onFavourite,
  statusProps = {},
}) => {

  return (
    <>
      <CardContent sx={contentStyle}>
        <Typography fontWeight={600} component="span" sx={titleStyle}>
          {product.title}
        </Typography>
        <Typography fontWeight={600} component="span" sx={{ marginLeft: 2 }}>
          {product.price} B.
        </Typography>
      </CardContent>

      <CardActions sx={actionStyle}>
        {!isUndef(status) ? (
          <Typography variant="caption" fontSize=".7rem" color="#A0A3BD">
            amount: {product.quantity}
          </Typography>
        ) : isFunc(status) ? (
          status(statusProps)
        ) : (
          <>{status}</>
        )}

        <IconButton
          onClick={(e) => {
            e.preventDefault();
            if (isLoggedIn) {
              onFavourite(product.id);
              axios
                .post(`${config.SERVER_URL}/profile/favourite`, {
                  customer_id: user.id,
                  product_id: product.id,
                })
                .then(({ data }) => {
                  console.log(data);
                });
            }
          }}
          sx={{ fontWeight: "bold", fontSize: "22px" }}
        >
          {product.customer_wishlist && product.customer_wishlist.length > 0 ? (
            <FavoriteRoundedIcon sx={{ color: "#FD6637" }} fontSize="inherit" />
          ) : (
            <FavoriteBorderRoundedIcon
              sx={{ color: "#323232" }}
              fontSize="inherit"
            />
          )}
        </IconButton>
      </CardActions>
    </>
  );
};

const contentStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  padding: "15px 5px 0px 5px",
};

const actionStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0 0 5px",
};

const titleStyle = {
  flex: 1,

  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1 /* number of lines to show */,
  WebkitBoxOrient: "vertical",
};

export default ProductContent;
