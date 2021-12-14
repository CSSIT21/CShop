import { useRef, useLayoutEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Box, Typography, Button, Stack } from '@mui/material';
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
import { noop } from '~/common/utils';

const BannerItem = ({
	index = 0,
	items = [],
	item = {},
	setItems = noop,
	onNext = noop,
	onPrev = noop,
	onDelete = noop
}) => {
	const classes = useStyles();
	const wrapper = useRef(null);
	const [open, setOpen] = useState(false);
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

	const onUploadSubImg = (e) => {
		if (e.target.files.length) {
			const path = URL.createObjectURL(e.target.files[0]);

			setItems(items => {
				items[index].pictures.children.push({
					order: items[index].pictures.children.length,
					path,
				})

				return [...items];
			})

			setTimeout(() => onSetItem(), 500);
			e.target.value = null;
		}
	};

	const onDeleteSubImg = (subIndex) => {
		setItems(items => {
			items[index].pictures.children.splice(subIndex, 1);
			return [...items];
		});
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
						path={main}
						title={`Banner ${item.order}`}
						Icon={<DeleteRoundedIcon />}
						onClickHandler={() => onDelete(index)}
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
						<UploadButton
							onUploadImg={onUploadSubImg}
							Icon={<AddIcon />}
							title="More Pictures"
							disabled={children.length === 4}
						/>
					</Stack>

					{/* Input form */}
					<BannerInfo
						item={item}
						open={open}
						onClose={onClickDialog}
					/>
				</Stack>

				{/* Sub Image */}
				{children.length !== 0 &&
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{children.map((item, index) => (
							<SubImage
								path={item.path}
								index={index}
								title={`subImage ${index}`}
								key={index}
								onDelete={onDeleteSubImg}
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