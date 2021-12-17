import { useRef, useLayoutEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants"
import { makeStyles } from "@mui/styles";
import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddIcon from '@mui/icons-material/Add';
import UploadButton from './UploadButton';
import SubImage from './SubImage';
import MainImage from './MainImage';
import BannerInfo from './BannerInfo';
import CButton from '~/common/components/CButton';
import { noop, getUrl } from '~/common/utils';

const BannerItem = ({
	index = 0,
	items = [],
	item = {},
	setItems = noop,
	onNext = noop,
	onPrev = noop,
	getData = noop,
	handleDeleteBanner = noop,
	mainLoading = false,
}) => {
	const classes = useStyles();
	const wrapper = useRef(null);
	const [open, setOpen] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const { main, children = [] } = item.pictures;

	useLayoutEffect(() => {
		window.addEventListener('resize', () => onSetItem());
		setTimeout(() => onSetItem(), 500);
		return () => window.removeEventListener('resize', () => onSetItem());
	}, []);

	useLayoutEffect(() => {
		setTimeout(() => onSetItem(), 500);
	}, [index, items]);

	const onSetItem = () => {
		setItems(items => {
			if (index < items.length && wrapper && wrapper.current && items[index].height != wrapper.current.offsetHeight) {
				items[index].height = wrapper.current.offsetHeight;
				return [...items];
			}
			return items;
		});
	};

	const handleAddSubImg = async (e) => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let bannerImage = {};
			try {
				setAddLoading(true);
				const { success, original_link } = await getUrl(file);

				if (success) {
					bannerImage = {
						title: file.name,
						position: "Sub",
						path: original_link,
						thumbnail: original_link,
					};
				}
				else {
					console.log(data.error);
					return Swal.fire('Oop!', 'Cannot upload sub image', 'error');
				}
			}
			catch (err) {
				console.log(err.message);
				setAddLoading(true);
				return Swal.fire('Oop!', 'Cannot upload sub image', 'error');
			}

			axios
				.post(`${config.SERVER_URL}/home/banner/${item.id}/sub`, { ...bannerImage })
				.then(({ data }) => {
					if (data.success) {
						console.log(data.bannerPic);
						getData();
						setAddLoading(false);

						Swal.fire('Done', "Already uploaded new sub image", 'success');
					}
				})
				.catch((err) => {
					console.log(err);
					e.target.value = null;
					return Swal.fire('Oop!', 'Cannot added new sub image', 'error');
				})

			setTimeout(() => onSetItem(), 500);
			e.target.value = null;
		}
	};

	const onDeleteSubImg = async (id) => {
		setDeleteLoading(true);
		axios
			.delete(`${config.SERVER_URL}/home/banner/${item.id}/sub/${id}`)
			.then(({ data }) => {
				if (data.success) {
					console.log(data.deletedImage);
					getData();
					setDeleteLoading(false);
					return Swal.fire('Done', "Already deleted sub image of this banner", 'success');
				}
			})
			.catch((err) => {
				console.log(err);
				setDeleteLoading(false);
				return Swal.fire('Oop!', 'Cannot delete sub image of this banner, please try again', 'error');
			})
	};

	const onClickDialog = () => {
		setOpen(!open);
	};

	return (
		<Box className={classes.bannerBlock} ref={wrapper}>
			{index > 0 &&
				<Button aria-label="prev" sx={arrowButton} onClick={() => onPrev(index)}>
					<ArrowDropUpRoundedIcon sx={{ fontSize: "2.5rem" }} />
				</Button>
			}

			<Stack direction="column" gap={4}>
				{/* Main Image */}
				<Stack justifyContent="center">
					<MainImage
						path={main.path}
						title={main.title}
						Icon={<DeleteRoundedIcon sx={{ fontSize: "2.2em" }} />}
						onClickHandler={handleDeleteBanner}
						loading={mainLoading}
					/>
				</Stack>

				{/* Add picture button */}
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					my={3}
				>
					<Typography fontSize={20} fontWeight={500}>More About Banner</Typography>

					<Stack direction="row" spacing={2}>
						<CButton
							icon={<EditRoundedIcon />}
							title="Information"
							width="135px"
							height="42px"
							onClick={onClickDialog}
						/>
						<Box sx={{ m: 1, position: 'relative' }}>
							<UploadButton
								onUploadImg={handleAddSubImg}
								Icon={<AddIcon />}
								title="More Pictures"
								disabled={children.length === 4 || addLoading}
							/>
							{addLoading && (
								<CircularProgress
									size={24}
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-16px',
										marginLeft: '-16px',
									}}
								/>
							)}
						</Box>
					</Stack>

					{/* Input form */}
					<BannerInfo
						setItems={setItems}
						item={item}
						open={open}
						getData={getData}
						handleDialog={onClickDialog}
					/>
				</Stack>

				{/* Sub Image */}
				{children.length !== 0 &&
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{children.map((item) => (
							< SubImage
								key={item.id}
								id={item.id}
								path={item.path}
								title={item.title}
								onDelete={onDeleteSubImg}
								loading={deleteLoading}
							/>
						))}
					</Box>
				}

				{/* Current amount*/}
				<Typography
					sx={{ textAlign: "center" }}
					fontSize={13}
					color="#A0A3BD"
				>
					{children.length + 1}/5
				</Typography>
			</Stack>

			{index < items.length - 1 &&
				<Button aria-label="next" sx={arrowButton} onClick={() => onNext(index)}>
					<ArrowDropDownRoundedIcon sx={{ fontSize: "2.5rem" }} />
				</Button>
			}
		</Box>
	);
};

const useStyles = makeStyles({
	// if possible, not try to change this class ;-;
	bannerBlock: {
		position: "relative",
		width: "100%",
		height: "auto",
		borderBottom: '1px solid #C4C4C4',
	},
});

const arrowButton = {
	width: "100%",
	padding: "0",
	margin: "10px 0",
	color: '#C4C4C4',

	"&:hover": {
		backgroundColor: "#fafafa",
	},
}

export default BannerItem;