import { Grid } from "@mui/material";
import { For } from "~/common/utils/index";
import ProductCard from "~/common/components/ProductCard";
import { noop } from "~/common/utils/index";

const GridCard = ({ products, onFavorite = noop, addToCart = true }) => {

	return (
		<Grid container spacing={2} mb={5}>
			<For each={products} children={(product) => (
				<Grid item xs={6} md={3} mb={3} key={product.id}>
					<ProductCard product={product} onFavourite={onFavorite} to="/product/1" addToCart={addToCart} />
				</Grid>
			)} />
		</Grid>
	);
};

export default GridCard;