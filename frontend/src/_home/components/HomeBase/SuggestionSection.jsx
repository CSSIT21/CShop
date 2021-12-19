import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import CButton from "~/common/components/CButton";
import GridCard from "../commonBase/GridCard";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const SuggestionSection = () => {
	const { user } = useRecoilValue(authState);
	const [products, setProducts] = useState([]);
	const [skip, setSkip] = useState(0);
	const classes = useStyles();

	const getData = () => {
		axios
			.get(`${config.SERVER_URL}/home/suggestions/${user.id}?take=16&skip=${skip}`)
			.then(({ data }) => {
				if (data.success) {
					return setProducts(data.suggestions);
				}
				else {
					return console.log(data);
				}
			})
			.catch((err) => {
				return console.log(err.message);
			})
	};

	const getMoreData = () => {
		setSkip(skip + 12);
		axios
			.get(`${config.SERVER_URL}/home/suggestions/${user.id}?take=12&skip=${skip}`)
			.then(({ data }) => {
				if (data.success) {
					return setProducts(products => [...products, ...data.suggestions]);
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
		<Box className={classes.suggestionWrapper}>
			<Box className={classes.suggestionHeader}>
				<Typography component="h3" fontSize="30px" fontWeight={600}>Suggestions</Typography>
				<Button href="/home/suggest" className={classes.suggestionButton} color="primary" >Show all </Button>
			</Box>

			<GridCard addToCart={false} products={products} />

			<Box display="flex" justifyContent="center">
				<CButton title="Show more products" height='40px' onClick={getMoreData} />
			</Box>
		</Box>
	);
};

const useStyles = makeStyles({
	suggestionWrapper: {
		width: '100%',
		backgroundColor: '#F4F5F6',
		padding: '50px 245px',
	},

	suggestionHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 30,

		"& a": {
			fontWeight: 'bold',
			textTransform: 'capitalize',
			fontSize: 16,
		},
	},
});


export default SuggestionSection;