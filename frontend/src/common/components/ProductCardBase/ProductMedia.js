import { CardMedia } from "@mui/material";

const ProductMedia = ({ image, title }) => {
	return (
		<CardMedia
			component="img"
			image={image}
			alt={title}

			sx={{
				margin: "0 auto",
				maxWidth: "205px",
				height: "180px",
				borderRadius: "15px",
			}}
		/>
	);
};

export default ProductMedia;