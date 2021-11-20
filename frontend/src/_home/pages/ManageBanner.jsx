import { useState, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CButton from '~/common/components/CButton';
import BannerList from '../components/BannerBase/BannerList';
import BannerPic from "../assets/images/TopBanner.png";
import UploadButton from '../components/BannerBase/UploadButton';

const bannerList = [
	{
		id: 0,
		description: "banner about washing",
		pictures: {
			head: BannerPic,
			children: [
				{
					id: 0,
					path: BannerPic,
				},
				{
					id: 1,
					path: BannerPic,
				},
			]
		},
	},
	{
		id: 1,
		description: "banner about washing",
		pictures: {
			head: BannerPic,
			children: [
				{
					id: 0,
					path: BannerPic,
				},
				{
					id: 1,
					path: BannerPic,
				},
				{
					id: 2,
					path: BannerPic,
				},
				{
					id: 3,
					path: BannerPic,
				},
			]
		},
	},
	{
		id: 2,
		description: "banner about washing",
		pictures: {
			head: BannerPic,
			children: [
				{
					id: 0,
					path: BannerPic,
				},
			]
		},
	},
];

const ManageBanner = () => {
	const classes = useStyles();
	const [items, setItems] = useState([]);

	useLayoutEffect(() => {
		setItems(bannerList.map(item => ({ ...item, height: 100 })));
	}, []);

	return (
		<Box sx={{ width: "100%", marginTop: "50px" }}>
			<Box className={classes.header}>
				<Stack direction="row" spacing={1}>
					<Typography fontSize={28} fontWeight={600} color="#FD6637">Banner</Typography>
					<Typography fontSize={28} fontWeight={600}>Management</Typography>
				</Stack>
				<CButton title="Save" width="90px" height="42px" />
			</Box>

			<Box className={classes.header} mt={8} pb={4} sx={{ borderBottom: '1px solid #C4C4C4' }}>
				<Typography fontSize={20} fontWeight={500}>Create Banner</Typography>
				<UploadButton Icon={<AddIcon />} title="Add Banner Carousel" />
			</Box>

			<BannerList items={items} setItems={setItems} />
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
