import { makeStyles } from "@mui/styles";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const SubImage = ({ path = "", title = "picture", ...rest }) => {
	const classes = useStyles();

	return (
		<div className={classes.block} {...rest}>
			<img src={path} alt={title} style={{ width: '100%', transition: "0.25s all ease-in-out", }} />
			<DeleteRoundedIcon style={{
				top: "50%",
				left: "50%",
				position: "absolute",
				transform: "translate(-50%, -50%)",
				transition: "0.25s all ease-in-out",
				cursor: "pointer"
			}} />
		</div>
	);
};

const useStyles = makeStyles({
	block: {
		borderRadius: 20,
		objectFit: "contain",
		width: "50%",
		"&:nth-of-type(2n+1)": {
			paddingRight: '.5rem'
		},
		"&:nth-of-type(2n)": {
			paddingLeft: '.5rem'
		},
		paddingBottom: '.5rem',
		position: "relative",
		"&:hover img": {
			opacity: "0.5",
		},
		"&:hover .MuiSvgIcon-root": {
			opacity: "1",
		},
		"& .MuiSvgIcon-root": {
			opacity: "0",
		},
	},
});

export default SubImage;
