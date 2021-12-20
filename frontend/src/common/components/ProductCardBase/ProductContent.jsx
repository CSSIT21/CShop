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
import authState from "~/common/store/authState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import config from "~/common/constants";

const ProductContent = ({
  product,
  status,
  onFavourite,
  statusProps = {},
  addToCart,
}) => {
  const { user, isLoggedIn } = useRecoilValue(authState);

  const onAddToCard = () => {
    if (isLoggedIn) {
      axios
        .post(`${config.SERVER_URL}/log-system/add-to-cart/${user.id}/${product.id}`, {
          added_date: new Date().toISOString(),
        })
        .then(({ data }) => {
          if (data.success) {
            return console.log(data.addToCart);
          }
          else {
            return console.log(data);
          }
        })
        .catch((err) => {
          return console.log(err.message);
        })
    }
  };

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
            onFavourite(product.id);
            //api fav
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
      {addToCart && (
        <CButton
          icon={<ShoppingCartIcon sx={{ fontSize: "18px" }} />}
          title="Add to cart"
          fontSize="14px"
          width="100%"
          height="38px"
          onClick={onAddToCard}
        />
      )}
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
