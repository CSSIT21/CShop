import React from 'react'
import { useState } from "react";
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import Carousel from '~/common/components/Carousel';
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import ProductCard from '~/common/components/ProductCard';
import HeaderWithButton from './HeaderWithButton';

const useStyles = makeStyles({
	bestsellerWrapper: {
		width: '100%',
		margin: '20px 0',
	},

	bestsellerContent: {
		maxWidth: '1000px',
		margin: '0 auto',
		marginBottom: '40px',
		padding: '40px 80px',

		backgroundColor: '#FDF4DD',
		borderRadius: '20px',
	},
});

const BestsellerSection = ({ bestsellerItems, onFavourite }) => {

	const classes = useStyles();

	const [products, setProducts] = useState(bestsellerItems);
	const [page, setPage] = useState(0);
	const productsPerRow = 4;
	const totalPage = Math.ceil(products.length / productsPerRow);

	return (
		<Box className={classes.bestsellerWrapper}>
			<Box className={classes.bestsellerContent}>
				<HeaderWithButton
					colors="#FD6637"
					headerName="Best Seller"
					page={page}
					setPage={setPage}
					totalPage={totalPage}
				/>

				<Box className={classes.bestsellerCarousel}>
					<Carousel
						items={products}
						pageState={page}
						setPageState={setPage}
						itemsPerRow={4}
					>
						{(product, idx) => (
							<ProductCard
								product={product}
								onFavourite={onFavourite}
								to="/product/1"
								key={product.id} />
						)}
					</Carousel>
				</Box>
			</Box >

			<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={totalPage} />
		</Box>
	)
}

export default BestsellerSection;
