import React from 'react'
import { useState, useEffect } from "react";
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import Carousel from '~/common/components/Carousel';
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import ProductCard from '~/common/components/ProductCard';
import HeaderWithButton from './HeaderWithButton';
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import { Typography } from '@mui/material';

const BestsellerSection = () => {
	const classes = useStyles();
	const { isLoggedIn, user } = useRecoilValue(authState);
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const productsPerRow = 5;
	const totalPage = Math.ceil(products.length / productsPerRow);

	const getData = () => {
		let id = 0;
		if (isLoggedIn) id = user.id;

		axios
			.get(`${config.SERVER_URL}/home/bestsellers/${id}`)
			.then(({ data }) => {
				if (data.success) {
					return setProducts(data.bestsellers);
				}
				else {
					return console.log(data);
				}
			})
			.catch((err) => {
				return console.log(err.message);
			})
	};

	useEffect(() => {
		getData();
	}, [])

	return (
		<Box className={classes.bestsellerWrapper}>
			<Box className={classes.bestsellerContent}>
				<HeaderWithButton
					colors="#FD6637"
					headerName="Best Seller"
					page={page}
					setPage={setPage}
					totalPage={totalPage}
					isShow={products.length > 0}
				/>

				<Box className={classes.bestsellerCarousel}>
					{products.length > 0
						? (<Carousel
							items={products}
							pageState={page}
							setPageState={setPage}
							itemsPerRow={productsPerRow}>
							{(product) => (
								<ProductCard
									product={product}
									key={product.id} />
							)}
						</Carousel>)
						: (<Typography
							textAlign="center"
							fontSize={16}
							fontWeight={400}
							color="gray"
							mt={3}>
							No bestseller products to show
						</Typography>)}
				</Box>
			</Box >

			<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={totalPage} />
		</Box>
	)
}
const useStyles = makeStyles({
	bestsellerWrapper: {
		width: '100%',
		margin: '20px 0',
	},

	bestsellerContent: {
		margin: '0 160px',
		marginBottom: '40px',
		padding: '40px 80px',

		backgroundColor: '#FDF4DD',
		borderRadius: '20px',
	},
});


export default BestsellerSection;
