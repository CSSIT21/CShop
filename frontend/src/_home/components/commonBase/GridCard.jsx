import { Grid } from "@mui/material";
import { For } from "~/common/utils/index";
import ProductCard from "~/common/components/ProductCard";
import { noop } from "~/common/utils/index";

const GridCard = ({
	products,
	onFavorite = noop,
	addToCart = true,
	xs = 2,
	md = 3,
}) => {

	return (
		<Grid container spacing={10} mb={5}>
			<For each={products} children={(product) => (
				<Grid item xs={xs} md={md} mb={3} key={product.id}>
					<ProductCard product={product} onFavourite={onFavorite} to="/product/1" addToCart={addToCart} />
				</Grid>
			)} />
		</Grid>
	);
};

export default GridCard;