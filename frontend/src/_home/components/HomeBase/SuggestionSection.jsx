import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import CButton from "~/common/components/CButton";
import { Grid } from "@mui/material";
import { For } from "~/common/utils/index";
import ProductCard from "~/common/components/ProductCard";
import axios from "axios";
import config from "~/common/constants";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";

const SuggestionSection = ({ onFavorite = () => { } }) => {
	const { isLoggedIn, user } = useRecoilValue(authState);
	const [products, setProducts] = useState([]);
	const [skip, setSkip] = useState(4);
	const classes = useStyles();
	const [product_ids, setProduct_ids] = useState([]);

	const getData = () => {
		if (isLoggedIn) {
			axios
				.get(`https://ml-1.cshop.cscms.ml/suggestHomepage?uid=${user.id}`)
				.then(({ data }) => {
					// setProduct_ids(data.products);
					// return data.products;
					setProduct_ids([123, 234, 45, 452, 45, 92, 35, 6, 8, 9, 55, 7563, 92, 32, 6, 23, 2, 4, 5, 7, 34, 2, 35, 776, 4576, 908, 34]);
					return [123, 234, 45, 452, 45, 92, 35, 6, 8, 9, 55, 7563, 92, 32, 6, 23, 2, 4, 5, 7, 34, 2, 35, 776, 4576, 908, 34];
				})
				.then((products) => {
					axios
						.get(`${config.SERVER_URL}/home/suggestions/${user.id}?product_ids=${products}&take=12&skip=0`)
						.then(({ data }) => {
							if (data.success) {
								return setProducts(data.suggestions);
							}
							else {
								return console.log(data);
							}
						})
				})
				.catch((err) => {
					console.log(err.message);
				})
		}
	};

	const getMoreData = () => {
		axios
			.get(`${config.SERVER_URL}/home/suggestions/${user.id}?product_ids=${product_ids}&take=8&skip=${skip}`)
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
	}, []);

	useEffect(() => {
		getMoreData();
	}, [skip]);

	return (
		<Box className={classes.suggestionWrapper}>
			<Box className={classes.suggestionHeader}>
				<Typography component="h3" fontSize="30px" fontWeight={600}>Suggestions</Typography>
				<Button href="/home/suggest" className={classes.suggestionButton} color="primary" >Show all </Button>
			</Box>

			{products.length > 0
				? (<>
					<Grid container spacing={10} mb={5}>
						<For each={products} children={(product) => (
							<Grid item xs={2} md={3} mb={3} key={product.id}>
								<ProductCard product={product} onFavourite={onFavorite} />
							</Grid>
						)} />
					</Grid>

					<Box display="flex" justifyContent="center">
						<CButton
							title="Show more products"
							height='40px'
							onClick={() => setSkip(skip + 8)}
						/>
					</Box>
				</>)
				: <Typography
					textAlign="center"
					fontSize={16}
					fontWeight={400}
					color="gray">
					No suggestion products to show
				</Typography>}
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