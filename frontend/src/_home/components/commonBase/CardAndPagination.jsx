import GridCard from "./GridCard";
import { Pagination } from '@mui/material';

const CardAndPagination = ({ products, onFavorite, onPageChange, page }) => {
	return (
		<>
			<GridCard products={products} onFavorite={onFavorite} />

			<Pagination
				count={10}
				shape="rounded"
				color="primary"
				page={page}
				onChange={onPageChange}
			/>
		</>
	);
};

export default CardAndPagination;