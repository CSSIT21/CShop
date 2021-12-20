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
	const [categories, setCategories] = useState([]);
	const [page, setPage] = useState(0);
	const classes = useStyles();
	const itemsPerRow = 6;
	const totalPage = Math.ceil(categories.length / itemsPerRow);

	const getData = () => {
		axios
			.get(`${config.SERVER_URL}/home/categories`)
			.then(({ data }) => {
				if (data.success) {
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

	useEffect(() => {
		getData();
	}, [])

	return (
		<Box className={classes.categoriesWrapper}>

			<Box className={classes.categoriesContent}>
				<HeaderWithButton
					colors="black"
					headerName="Categories"
					page={page}
					totalPage={totalPage}
					setPage={setPage}
				/>

				{categories.length > 0 &&
					<Carousel
						items={categories}
						pageState={page}
						setPageState={setPage}
						itemsPerRow={itemsPerRow}
					>
						{({ id, name, icon_id_from_category }) => (
							<Link to={`/search/category/${id}`}>
								<Box className={classes.categoriesItem} key={id}>
									<Typography component="h3" color="black" fontWeight={600} mb={2} >{name}</Typography>
									<img src={icon_id_from_category.path} alt={icon_id_from_category.title} />
								</Box>
							</Link>
						)}
					</Carousel>}
			</Box >

			<CustomDot width={50} setPageState={setPage} currentPage={page} totalPage={totalPage} />
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

export default CategoriesSection;
