import { CardMedia } from "@mui/material";

const SupportMedia = ({ image, title }) => {
	return (
		<CardMedia
			component="img"
			image={image}
			alt={title}
			sx={{
				margin: "0 auto",
				aspectRatio: '1',
				borderRadius: "15px",
			}}
		/>
	);
};

export default SupportMedia;