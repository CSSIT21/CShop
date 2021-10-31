import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import CButton from "../../../common/components/CButton";
import GridCard from "../commonBase/GridCard";

const useStyles = makeStyles({
	suggestionWrapper: {
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


const SuggestionSection = ({ suggestItems, onFavourite }) => {
	const [products, setProducts] = useState(suggestItems);
	const classes = useStyles();

	return (
		<Box className={classes.suggestionWrapper}>
			<Box className={classes.suggestionHeader}>
				<Typography component="h3" fontSize="30px" fontWeight="bold">Suggestions</Typography>
				<Button href="/home/suggest" className={classes.suggestionButton} color="primary" >Show all </Button>
			</Box>

			<GridCard addToCart={false} products={products} onFavorite={onFavourite} />

			<Box display="flex" justifyContent="center">
				<CButton title="Show more products" height='40px' />
			</Box>
		</Box>
	);
};


export default SuggestionSection;