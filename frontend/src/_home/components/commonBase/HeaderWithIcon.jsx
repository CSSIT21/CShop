import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	header: {
		display: 'flex',
		alignItems: 'center',
	},
});

const HeaderWithIcon = ({ 
	title = "",
	ItemIcon, 
	fontSize = 30, 
	fontWeight = 600,
	color = "#323232",
}) => {

	const classes = useStyles();

	const showIcon = () => <ItemIcon sx={{ color: "#FD6637", marginRight: "10px" }} />

	return (
		<>
			<Typography
				component="span"
				fontSize={fontSize}
				fontWeight={fontWeight}
				mb={6}
				className={classes.header}
				color={color}
			>
				{showIcon()}
				{title}
			</Typography>
		</>
	);
};

export default HeaderWithIcon;


