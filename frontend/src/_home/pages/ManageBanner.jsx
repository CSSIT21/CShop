import { useState, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CButton from '~/common/components/CButton';
import BannerList from '../components/BannerBase/BannerList';
import BannerPic from "../assets/images/TopBanner.png";
import NewBannerDialog from '../components/BannerBase/NewBannerDialog';

const bannerList = [
	{
		id: 0,
		order: 1,
		description: "banner about washing",
		start_date: "",
		end_date: "",
		visible: true,
		keywords: ["Free Shipping", "Flash sale", "Free!!", "Flash!!"],
		pictures: {
			main: BannerPic,
			children: [
				{
					order: 0,
					path: BannerPic,
				},
				{
					order: 1,
					path: BannerPic,
				},
			]
		},
	},
	{
		id: 1,
		order: 2,
		description: "banner about washing",
		start_date: "",
		end_date: "",
		visible: true,
		keywords: ["Free Shipping"],
		pictures: {
			main: BannerPic,
			children: [
				{
					order: 0,
					path: BannerPic,
				},
				{
					order: 1,
					path: BannerPic,
				},
				{
					order: 2,
					path: BannerPic,
				},
				{
					order: 3,
					path: BannerPic,
				},
			]
		},
	},
];

const ManageBanner = () => {
	const classes = useStyles();
	const [items, setItems] = useState([]);
	const [open, setOpen] = useState(false);

	useLayoutEffect(() => {
		setItems(bannerList.map(item => ({ ...item, height: 100 })));
	}, []);

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

				<NewBannerDialog open={open} onClose={onClickDialog} />
			</Box>

			<BannerList items={items} setItems={setItems} />
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