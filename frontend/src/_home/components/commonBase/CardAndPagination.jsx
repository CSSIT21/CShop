import { Pagination } from '@mui/material';
import GridCard from "../commonBase/GridCard";

const CardAndPagination = ({ products, onFavorite, onPageChange, page, count }) => {
	return (
		<>
			<GridCard products={products} onFavorite={onFavorite} />

			<Pagination
				count={Math.ceil(count / 16)}
				shape="rounded"
				color="primary"
				page={page}
				onChange={onPageChange}
			/>
		</>
	);
};

export default CardAndPagination;