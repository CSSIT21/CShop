import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
	footerStyle: {
		display: 'flex',
		justifyContent: 'center',

		padding: '10px 0',
		backgroundColor: '#F4F5F6',
		letterSpacing: '0.21em',
	},
});

const Footer = () => {
	const classes = useStyles();

	return (
		<Typography className={classes.footerStyle} component="div" color="#A0A3BD" fontSize="12px">
			COPYRIGHT&copy; 2021 CShop All Rights Reserved
		</Typography>
	);
};

export default Footer;
