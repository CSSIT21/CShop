import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import ProductMedia from "./ProductCardBase/ProductMedia";
import ProductContent from "./ProductCardBase/ProductContent";

const cardStyle = {
  minWidth: 200,
  maxWidth: 210,
  padding: '8px',

  borderRadius: "15px",
  border: 'none',
  transition: "all ease 0.125s",

  "&:hover": {
    transform: "scale(1.02)",
  },
};

const ProductCard = ({ product, to, onFavourite = () => { } }) => {
  console.log(product);
  return (
    <Link to={to}>
      <Card
        variant="outlined"
        sx={cardStyle}
      >
        <ProductMedia image={product.image} title={product.title} />
        <ProductContent product={product} onFavourite={onFavourite} />
      </Card>
    </Link>
  );
};

export default ProductCard;
