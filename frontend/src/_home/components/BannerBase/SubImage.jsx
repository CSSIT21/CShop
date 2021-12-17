import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { noop } from '~/common/utils';

const SubImage = ({
	id = 1,
	path = "",
	title = "picture",
	onDelete = noop,
	loading = false,
	...rest
}) => {
	const classes = useStyles();

	return (
		<div className={classes.block} {...rest}>
			<img src={path} alt={title} style={{ width: '100%', transition: "0.25s all ease-in-out", }} />
			{loading
				? <CircularProgress
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						marginTop: '-20px',
						marginLeft: '-20px',
					}} />
				: <DeleteRoundedIcon
					className={classes.iconStyle}
					sx={{ fontSize: "1.7rem" }}
					onClick={() => onDelete(id)}
				/>
			}
		</div>
	);
};

const useStyles = makeStyles({
	block: {
		position: "relative",
		objectFit: "contain",
		width: "50%",
		paddingBottom: '.5rem',

		"&:nth-of-type(2n+1)": {
			paddingRight: '.5rem'
		},
		"&:nth-of-type(2n)": {
			paddingLeft: '.5rem'
		},

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

	iconStyle: {
		color: "#FD6637",
		top: "50%",
		left: "50%",
		position: "absolute",
		transform: "translate(-50%, -50%)",
		transition: "0.25s all ease-in-out",
		cursor: "pointer"
	},
});

export default SubImage;