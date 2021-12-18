import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import ProductMedia from './ProductCardBase/ProductMedia';
import ProductContent from './ProductCardBase/ProductContent';
import { noop } from '../utils';

const cardStyle = {
  width: '100%',
  padding: '8px',
  margin: '0 auto',

  borderRadius: '15px',
  border: 'none',
  transition: 'all ease 0.125s',

  '&:hover': {
    transform: 'scale(1.02)',
  },
};

const productTemplate = {
  title: 'fake product',
  image: 'https://via.placeholder.com/410x360',
  price: 0,
  favourite: false,
};

const ProductCard = (props) => {
  const {
    product = productTemplate,
    to = '/product/1',
    onFavourite = noop,
    status = undefined,
    addToCart = false,
  } = props;
  return (
    <Link to={to}>
      <Card variant='outlined' sx={cardStyle}>
        <ProductMedia
          image={product?.product_picture[0]?.path}
          title={product.title}
        />
        <ProductContent
          product={product}
          status={status}
          statusProps={props}
          addToCart={addToCart}
          onFavourite={onFavourite}
        />
      </Card>
    </Link>
  );
};

export default ProductCard;
