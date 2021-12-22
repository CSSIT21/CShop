import { useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { useState } from "react";
import Carousel from "~/common/components/Carousel";
import CustomDot from "~/common/components/CarouselBase/CustomDot";
import { Typography } from '@mui/material';
import HeaderWithButton from './HeaderWithButton';
import { Link } from 'react-router-dom';
import axios from "axios";
import config from "~/common/constants";

const CategoriesSection = () => {
	const classes = useStyles();
	const [categories, setCategories] = useState([]);
	const [page, setPage] = useState(0);
	const itemsPerRow = 6;
	const totalPage = Math.ceil(categories.length / itemsPerRow);

	useEffect(() => {
		getData();
	}, [])

	const getData = async () => {
		axios
			.get(`${config.SERVER_URL}/home/categories`)
			.then(({ data }) => {
				if (data.success) {
					console.log(data.categories);
					return setCategories(data.categories);
				}
				else {
					return console.log(data);
				}
			})
			.catch((err) => {
				return console.log(err.message);
			})
	};

	return (
		<Box className={classes.categoriesWrapper}>
			<HeaderWithButton
				colors="black"
				headerName="Categories"
				page={page}
				totalPage={totalPage}
				setPage={setPage}
				isShow={categories.length > 0}
			/>

			{categories.length > 0
				? <>
					<Box className={classes.categoriesContent}>
						<Carousel
							items={categories}
							pageState={page}
							setPageState={setPage}
							itemsPerRow={itemsPerRow}
						>
							{({ id, name, icon_id_from_category: icon }) => (
								<Link to={name === 'Free Shipping' ? '/promotion' : `/search/category/${id}`}>
									<Box className={classes.categoriesItem} key={id}>
										<Typography component="h3" color="black" fontWeight={600} mb={2} >{name}</Typography>
										<div><img src={icon.path} alt={icon.title} /></div>
									</Box>
								</Link>
							)}
						</Carousel>
					</Box>
					<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={totalPage} />
				</>
				: <Typography
					textAlign="center"
					fontSize={16}
					fontWeight={400}
					color="gray">
					No categories to show
				</Typography>}
		</Box >
	);
};

const useStyles = makeStyles({
	categoriesWrapper: {
		margin: '40px 165px',
		padding: '40px 60px',
	},

	categoriesItem: {
		width: "90%",
		margin: "0 auto",
		padding: '20px 10px',
		height: '150px',

		backgroundColor: '#EFEFF1',
		borderRadius: '20px',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',

		'& div': {
			padding: '0 20px',
		},

		'& img': {
			width: '100%',
		},

	},

	categoriesContent: {
		marginBottom: '35px',
	},
});

export default CategoriesSection;
