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
import Swal from 'sweetalert2';
import authState from "~/common/store/authState";

const SuggestionSection = () => {
	const classes = useStyles();
	const { isLoggedIn, user } = useRecoilValue(authState);
	const [products, setProducts] = useState([]);
	const [skip, setSkip] = useState(0);

	useEffect(() => {
		getData();
	}, [skip]);

	const getData = () => {
		let customer_id = 0, take = 8;
		if (isLoggedIn) customer_id = user.id;
		if (skip === 0) take = 12;

		axios
			.get(`${config.SERVER_URL}/home/suggestions/${customer_id}?take=${take}&skip=${skip}`)
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

	const onFavorite = (id) => {
		if (isLoggedIn) {
			setProducts(products => {
				const target = products.find((e) => e.id == id);

				if (target.customer_wishlist.length > 0) target.customer_wishlist.pop();
				else target.customer_wishlist = [
					{ product_id: target.id, customer_id: user.id },
				];

				return [...products];
			});
		}
		else {
			Swal.fire({
				text: "Please login to add a product to your wishlist!",
				icon: "error",
				confirmButtonText: "OK",
				confirmButtonColor: "#FD6637",
				width: 300,
				timer: 2000,
				timerProgressBar: true
			});
		}
	};

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
							onClick={() => {
								if (skip === 0) setSkip(12);
								else setSkip(skip => skip + 8);
							}}
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