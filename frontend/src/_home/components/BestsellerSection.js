import React from 'react'
import { useState } from "react";
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Carousel from '../../common/components/Carousel';
import CustomDot from "../../common/components/CarouselBase/CustomDot";
import ArrowButton from "../../common/components/CarouselBase/ArrowButton";
import ProductCard from '../../common/components/ProductCard';

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
		marginBottom: '25px',
	},
});

const BestsellerSection = ({ bestsellerItems, onFavourite }) => {

	const [items, setItems] = useState(bestsellerItems);
	const [page, setPage] = useState(0);
	const classes = useStyles();

	return (
		<Box className={classes.bestsellerWrapper}>
			<Box className={classes.bestsellerContent}>
				<Box className={classes.bestsellerHeader}>
					<Typography component="h3" color="#FD6637" fontSize="30px" fontWeight="bold">Best Seller</Typography>
					{/* <ArrowButton /> */}
				</Box>

				<Box className={classes.bestsellerCarousel}>
					<Carousel
						items={items}
						pageState={page}
						setPageState={setPage}
						itemsPerRow={4}

					>
						{(item, idx) => (
							< ProductCard product={item} onFavourite={onFavourite} to="/product/1" key={item.id} />
						)}
					</Carousel>
				</Box>
			</Box >

			<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={2} />
		</Box>
	)
}

export default BestsellerSection;
