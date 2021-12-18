import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CButton from '~/common/components/CButton';
import BannerList from '../components/BannerBase/BannerList';
import NewBannerDialog from '../components/BannerBase/NewBannerDialog';

const ManageBanner = () => {
	const classes = useStyles();
	const [items, setItems] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		axios
			.get(`${config.SERVER_URL}/home/banner/manage`)
			.then(({ data }) => {
				if (data.success) {
					console.log(data.banners);
					setItems(data.banners.map(item => ({ ...item, height: 100 })));
				}
			})
			.catch((error) => {
				console.log(err.message);
				return Swal.fire('Something went wrong', "Sorry, we cannot fetch banner's data to show", 'error');
			})
	};

	const onClickDialog = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ width: "100%", marginTop: "50px" }}>
			<Box className={classes.header}>
				<Stack direction="row" spacing={1}>
					<Typography
						fontSize={28}
						fontWeight={600}
						color="#FD6637"
					>
						Banner
					</Typography>
					<Typography fontSize={28} fontWeight={600}>Management</Typography>
				</Stack>
				<CButton
					title="Save"
					width="90px"
					height="42px"
				/>
			</Box>

			<Box className={classes.header} sx={{ borderBottom: '1px solid #C4C4C4' }}>
				<Typography fontSize={20} fontWeight={500}>Create Banner</Typography>
				<Button
					component="span"
					variant="outlined"
					startIcon={<AddIcon />}
					sx={{ height: "44px", borderWidth: "2px" }}
					onClick={onClickDialog}
				>
					<Typography sx={{ textTransform: "capitalize" }}>
						Add Banner Carousel
					</Typography>
				</Button>

				<NewBannerDialog open={open} handleDialog={onClickDialog} itemCount={items.length} setItems={setItems} />
			</Box>

			{items.length === 0
				? (<Typography textAlign="center" fontSize={36} fontWeight={500} color="lightgray" mt={5}>No banner to show</Typography>)
				: (<BannerList items={items} setItems={setItems} getData={getData} />)}
		</Box>
	);
};

const useStyles = makeStyles({
	header: {
		width: "90%",
		margin: "0 auto",
		paddingBottom: "32px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default ManageBanner;