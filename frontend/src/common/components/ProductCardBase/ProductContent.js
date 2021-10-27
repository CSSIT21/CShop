import { 
  FavoriteRounded as FavoriteRoundedIcon, 
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  ShoppingCart as ShoppingCartIcon
} from "@mui/icons-material";
import { CardContent, Typography, IconButton, Box, CardActions } from "@mui/material";
import { isFunc, isUndef } from './../../utils/index';
import CButton from "~/common/components/CButton";

const contentStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  padding: '15px 5px 5px 5px',
};

const actionStyle = {
  width: '100%',
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: '0 0 0 5px',
};

const titleStyle = {
  flex: 1,

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1, /* number of lines to show */
  WebkitBoxOrient: 'vertical',
};

const ProductContent = ({
  product,
  status,
  onFavourite,
  statusProps={},
  addToCart
}) => {
  return (
    <>
      <CardContent
        sx={contentStyle}>
        <Typography gutterBottom fontWeight={600} component="span" sx={titleStyle}>{product.title}</Typography>
        <Typography gutterBottom fontWeight={600} component="span" sx={{ marginLeft: 2 }}>{product.price} B.</Typography>
      </CardContent >

      <CardActions sx={actionStyle}>
        {
          (!isUndef(status)) ? <Typography variant="caption" fontSize=".68rem" color="#A0A3BD">
          {product.status}
          </Typography> : (isFunc(status) ? status(statusProps) : <>{status}</>)
        }

        <IconButton
          onClick={(e) => {
            e.preventDefault();
            onFavourite(product.id);
          }}
          sx={{ fontWeight: "bold", fontSize: '22px' }}
        >
          {product.favourite
            ? <FavoriteRoundedIcon sx={{ color: "#FD6637" }} fontSize="inherit" />
            : <FavoriteBorderRoundedIcon sx={{ color: "#323232" }} fontSize="inherit" />
          }
        </IconButton>

      </CardActions>
      
      {addToCart && 
        <CButton 
          icon={<ShoppingCartIcon sx={{fontSize: '18px'}} />} 
          title="Add to cart" 
          fontSize='14px'
          width="100%"
          height='38px'
        />
      }
    </>
  );
};

export default ProductContent;
