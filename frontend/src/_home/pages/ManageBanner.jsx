import { makeStyles } from "@mui/styles";
import BannerList from '../components/BannerBase/BannerList';
import { Box } from "@mui/system";
import { Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
				<CButton title="Save" width="90px" height="42px" />
			</Box>

			<Box className={classes.header} mt={8} pb={4} sx={{ borderBottom: '1px solid #C4C4C4' }}>
				<Typography fontSize={20} fontWeight={500}>Create Banner</Typography>
				<Button sx={{ height: "42px", borderWidth: "2px" }} variant="outlined" startIcon={<AddIcon />}>
					Add Banner Carousel
				</Button>
			</Box>

			<BannerList />
		</Box>
	);
};

const useStyles = makeStyles({
	header: {
		width: "90%",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
export default ManageBanner;
