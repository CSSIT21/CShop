import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";
import CButton from "~/common/components/CButton";
import BannerImage from "../../assets/images/BottomBanner.png";

const useStyles = makeStyles({
	bottomBannerWrapper: {
		position: 'relative',
		width: '100%',
		height: 450,
		overflow: 'hidden',
		boxSizing: 'border-box',
		margin: '15px 0',
		padding: '0 100px',

		display: 'flex',

		background: 'linear-gradient(90deg, #FDF4DD, #FFE9B1)',
	},

	bottomBannerContent: {
		width: '60%',

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},


	bottomBannerPic: {
		position: "absolute",
		right: 0,
		top: 5,

		width: '37%',
	},

});

const descriptionStyle = {
	width: 400,
	margin: '20px 0 40px 0',

	fontSize: 18,

	overflowWrap: 'break-word',
};

const BottomBanner = () => {
	const classes = useStyles();

	return (
		<Box className={classes.bottomBannerWrapper}>
			<Box className={classes.bottomBannerContent}>
				<Box>
					<Typography component="span" fontWeight="bold" fontSize="54px" >Becoming &nbsp;</Typography>
					<Typography component="span" fontWeight="bold" fontSize="54px" color="#FD6637">SELLER</Typography>
					<Typography component="span" fontWeight="bold" fontSize="54px">!</Typography>
				</Box>

				<Typography component="p" sx={descriptionStyle} >
					Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incide et dolore magna aliqua.
				</Typography>

				<Link to="/register">
					<CButton
						title="Register Now"
						width="150px"
						height="50px"
						fontSize="17px"
					/>
				</Link>
			</Box>

			<img className={classes.bottomBannerPic} src={BannerImage} alt="Banner" />
		</Box >
	)
}
export default BottomBanner;