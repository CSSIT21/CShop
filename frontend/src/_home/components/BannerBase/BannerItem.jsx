import { useRef, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, Button, Stack } from '@mui/material';
import { noop } from '~/common/utils';
import UploadButton from './UploadButton';
import SubImage from './SubImage';

const BannerItem = ({
	index = 0,
	items = [],
	setItems = noop,
	onNext = noop,
	onPrev = noop
}) => {
	const wrapper = useRef(null);
	const classes = useStyles();
	const item = items[index];
	const { head, children = [] } = item.pictures;

	const onSetItem = () => {
		setItems(items => {
			items[index].height = wrapper.current.offsetHeight;
			return [...items];
		});
	};

	useLayoutEffect(() => {
		onSetItem();
	}, [index]);

	useLayoutEffect(() => {
		window.addEventListener('resize', () => onSetItem());
		setTimeout(() => onSetItem(), 500);
		return () => window.removeEventListener('resize', () => onSetItem());
	}, []);

	const onUploadImg = (e) => {
		console.log("1");
		if (e.target.files.length) {
			const newImg = URL.createObjectURL(e.target.files[0]);
			console.log(newImg);
		}
	};

	return (
		<Box className={classes.bannerBlock} ref={wrapper}>
			{index > 0 &&
				<Button sx={arrowButton} onClick={() => onPrev(index)} aria-label="prev">
					<ArrowDropUpRoundedIcon sx={{ fontSize: "2.5rem" }} />
				</Button>
			}

			<Stack direction="column" gap={5}>
				<Stack justifyContent="center">
					<img
						width="100%"
						src={head}
						alt={`Banner ${item.id}`}
						style={{ display: "block" }}
					/>
				</Stack>

				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Typography fontSize={20} fontWeight={500}>Add more pictures</Typography>
					<UploadButton
						Icon={<AddIcon />}
						title="Choose Pictures"
						disabled={children.length === 4}
						onUploadImg={onUploadImg}
					/>
				</Stack>

				{children.length !== 0 &&
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{children.map((item) => (
							<SubImage path={item.path} title="Banner!" key={item.id} />
						))}
					</Box>
				}

				<Typography
					sx={{ textAlign: "center" }}
					fontSize={13}
					color="#A0A3BD"
				>
					{children.length + 1}/5
				</Typography>
			</Stack>

			{index < items.length - 1 &&
				<Button sx={arrowButton} onClick={() => onNext(index)} aria-label="next" >
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