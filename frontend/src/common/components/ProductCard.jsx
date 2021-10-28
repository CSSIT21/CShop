import Card from '@mui/material/Card';
import React from 'react';
import { Link } from 'react-router-dom';
import { noop } from '../utils';
import ProductContent from './ProductCardBase/ProductContent';
import ProductMedia from './ProductCardBase/ProductMedia';

const cardStyle = {
	minWidth: 200,
	maxWidth: 210,
	padding: '8px',
	
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
	const { product = productTemplate, to = '/product/1', onFavourite = noop, status = undefined } = props;
	return (
			<Link to={to}>
				<Card
						variant="outlined"
						sx={cardStyle}
				>
					<ProductMedia image={product.image} title={product.title} />
					<ProductContent product={product} status={status} statusProps={props} onFavourite={function (e) {
						e.preventDefault();
						onFavourite.apply(this, arguments);
					}}
					/>
				</Card>
			</Link>
	);
};

export default ProductCard;
