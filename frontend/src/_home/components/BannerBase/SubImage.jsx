import { makeStyles } from "@mui/styles";

const SubImage = ({ path = "", title = "picture", ...rest }) => {
	const classes = useStyles();

	return (
		<div className={classes.block} {...rest}>
			<img src={path} alt={title} style={{ width: '100%' }} />
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
		paddingBottom: '.5rem'
	},
});

export default SubImage;
