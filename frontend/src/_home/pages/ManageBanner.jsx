import { makeStyles } from "@mui/styles";
import BannerList from '../components/BannerBase/BannerList';
import { Box } from "@mui/system";
import { Typography } from '@mui/material';
import CButton from '~/common/components/CButton';

const ManageBanner = () => {
	const classes = useStyles();

	return (
		<Box sx={{ width: "100%", marginTop: "50px" }}>
			<Box className={classes.header}>
				<Box sx={{ display: "flex" }}>
					<Typography fontSize={28} fontWeight={600} color="#FD6637">Banner &nbsp;</Typography>
					<Typography fontSize={28} fontWeight={600}>Management</Typography>
				</Box>
				<CButton title="Save" width="90px" height="44px" />
			</Box>
			<BannerList />
		</Box>
	);
};

const useStyles = makeStyles({
	header: {
		width: "80%",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
export default ManageBanner;
