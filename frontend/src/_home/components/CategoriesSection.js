import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "../../common/components/Carousel";
import CustomDot from "../../common/components/CarouselBase/CustomDot";
import { Typography } from '@mui/material';
import CarouselButton from '../../common/components/CarouselButton';

const useStyles = makeStyles({
	categoriesWrapper: {
		margin: '40px 165px',
		padding: '40px 80px',

	},

	categoriesHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '25px',

	},

	categoriesItem: {
		width: '140px',
		padding: '20px 5px',

		backgroundColor: '#EFEFF1',
		borderRadius: '20px',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',

		'& img': {
			width: '100px',
		},

	},

	categoriesContent: {
		marginBottom: '35px',
	},
});


const CategoriesSection = () => {
	const categoriesItems = [
		{
			id: 0,
			title: "Free Shipping",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 1,
			title: "Electonics",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 2,
			title: "Education",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 3,
			title: "Fashion",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 4,
			title: "Kids",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 5,
			title: "Beauty",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 6,
			title: "Furniture",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 7,
			title: "Accessories",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 8,
			title: "Food",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 9,
			title: "Sport",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
		{
			id: 10,
			title: "Plants",
			url: "https://images-na.ssl-images-amazon.com/images/I/61Gh-4LQXSL.png",
		},
	];

	const [items, setItems] = useState(categoriesItems);
	const [page, setPage] = useState(0);
	const classes = useStyles();

	return (
		<Box className={classes.categoriesWrapper}>
			<Box className={classes.categoriesHeader}>
				<Typography component="span" color="#12131c" fontSize="30px" fontWeight="bold" >Categories</Typography>
				<CarouselButton pageHandle={setPage} currentPage={page} totalPage={2} />
			</Box >

			<Box className={classes.categoriesContent}>
				<Carousel
					items={items}
					pageState={page}
					setPageState={setPage}
					itemsPerRow={6}
				>
					{(item) => (
						<Box className={classes.categoriesItem}>
							<Typography component="h3" color="black" fontWeight="bold" mb={2} >{item.title}</Typography>
							<img src={item.url} />
						</Box>
					)}
				</Carousel>
			</Box >

			<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={2} />
		</Box >

	);
};

export default CategoriesSection;
