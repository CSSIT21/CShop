import Card from "@mui/material/Card";
import ProductMedia from "./ProductCardBase/ProductMedia";
import ProductContent from "./ProductCardBase/ProductContent";
import { noop } from "../utils";
import authState from "~/common/store/authState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import config from "~/common/constants";
import { Link } from "react-router-dom";

const cardStyle = {
  width: "100%",
  padding: "8px",
  margin: "0 auto",

  borderRadius: "15px",
  border: "none",
  transition: "all ease 0.125s",

  "&:hover": {
    transform: "scale(1.02)",
  },
};

const productTemplate = {
  title: "fake product",
  image: "https://via.placeholder.com/410x360",
  price: 0,
  favourite: false,
};

const ProductCard = (props) => {
  const { user, isLoggedIn } = useRecoilValue(authState);
  const {
    product = productTemplate,
    to = "/product/1",
    onFavourite = noop,
    status = undefined,
  } = props;

  const postData = () => {
    if (isLoggedIn) {
      axios
        .post(`${config.SERVER_URL}/log-system/product/${user.id}/${product.id}`, {
          view_date: new Date().toISOString(),
        })
        .then(({ data }) => {
          if (data.success) {
            return console.log(data.product);
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

  const handleClick = () => {
    // api product log
    postData();
  };

  return (
    <Link to={"/product/" + product.id}>
      <Card variant="outlined" sx={cardStyle} onClick={handleClick}>
        <ProductMedia
          image={
            product.product_picture?.length > 0
              ? product.product_picture[0].path
              : null
          }
          title={product.title}
        />
        <ProductContent
          product={product}
          status={status}
          statusProps={props}
          onFavourite={onFavourite}
        />
      </Card>
    </Link>
  );
};

export default ProductCard;
