import { makeStyles } from "@mui/styles";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
	bannerComponent: {
		width: "300px",
		height: "100px",
		backgroundImage: "linear-gradient(135deg, rgb(168, 237, 234) 0%, rgb(254, 214, 227) 100%)",
	},
});

const BannerItem = ({ banner }) => {

	const classes = useStyles();

	return (
		<>
			<IconButton aria-label="prev">
				<ArrowDropUpIcon />
			</IconButton>

			<Box className={classes.bannerComponent}>

			</Box>

			<IconButton aria-label="next">
				<ArrowDropDownIcon />
			</IconButton>
		</>
	);
};

export default BannerItem;
