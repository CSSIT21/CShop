import React from 'react'
import { useState } from "react";
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography, Rating } from '@mui/material';
import Carousel from '~/common/components/Carousel';
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import ProductCard from '~/common/components/ProductCard';
import CarouselButton from '~/common/components/CarouselButton';

const useStyles = makeStyles({

	bestsellerWrapper: {
		width: '100%',
		margin: '20px 0',
	},

	bestsellerContent: {
		maxWidth: '1000px',
		margin: '0 auto',
		padding: '40px 80px',

		backgroundColor: '#FDF4DD',
		borderRadius: '20px',
		marginBottom: '40px',
	},

	bestsellerHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '25px',
	},
});

const BestsellerSection = ({ bestsellerItems, onFavourite }) => {

	const [products, setProducts] = useState(bestsellerItems);
	const [page, setPage] = useState(0);
	const classes = useStyles();
	const productsPerRow = 4;
	const totalPage = Math.ceil(products.length / productsPerRow);

	return (
		<Box className={classes.bestsellerWrapper}>
			<Box className={classes.bestsellerContent}>
				<Box className={classes.bestsellerHeader}>
					<Typography component="span" color="#FD6637" fontSize="30px" fontWeight="bold">Best Seller</Typography>
					<CarouselButton pageHandle={setPage} currentPage={page} totalPage={totalPage} />
				</Box>

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
							status={() => <Rating name="read-only" value={4.2} readOnly />} 
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