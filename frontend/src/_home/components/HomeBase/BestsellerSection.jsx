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

const BestsellerSection = () => {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const productsPerRow = 5;
	const totalPage = Math.ceil(products.length / productsPerRow);

	const getData = () => {
		axios
			.get(`${config.SEVER_URL}/home/bestsellers`)
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

	const onFavorite = () => {

	}

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
					{products.length > 0 &&
						<Carousel
							items={products}
							pageState={page}
							setPageState={setPage}
							itemsPerRow={productsPerRow}
						>
							{(product) => (
								<ProductCard
									product={product}
									to="/product/1"
									key={product.id} />
							)}
						</Carousel>}
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
