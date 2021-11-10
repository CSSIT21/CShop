import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	header: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const HeaderWithIcon = ({ header }) => {

	const classes = useStyles();

	return (
		<>
			<Typography
				component="span"
				fontSize="30px"
				fontWeight={600}
				mb={6}
				className={classes.header}
			>
				<header.icon sx={{ color: "#FD6637", marginRight: "10px" }} />
				{header.title}
			</Typography>
		</>


	);
};

export default HeaderWithIcon;


