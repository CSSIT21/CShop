import { useRef, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography, Button, Stack } from '@mui/material';
import { noop } from '~/common/utils';

const Image = styled(({ path, title, ...rest }) => (
	<div
		{...rest}
	>
		<img src={path} alt={title} style={{ width: '100%' }} />
	</div>
))(() => ({
	borderRadius: 20,
	objectFit: "contain",
	width: "50%",
	"&:nth-child(odd)": {
		paddingRight: '.5rem'
	},
	"&:nth-child(even)": {
		paddingLeft: '.5rem'
	},
	paddingBottom: '.5rem'
}));

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
		return () => {
			window.removeEventListener('resize', () => onSetItem());
		};
	}, []);

	return (
		<Box className={classes.bannerComponent} ref={wrapper}>
			{index > 0 &&
				<Box>
					<Button sx={arrowButton} onClick={() => onPrev(index)} aria-label="prev">
						<ArrowDropUpRoundedIcon sx={{ fontSize: "2.7rem" }} />
					</Button>
				</Box>
			}

			<Stack direction="column" gap={5}>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<img
						width="100%"
						src={head}
						alt={`Banner ${item.id}`}
						style={{ display: "block" }}
					/>
				</Box>

				<Box className={classes.addPicture} my={2}>
					<Typography fontSize={20} fontWeight={500}>Add more pictures</Typography>
					<Button sx={{ height: "42px", borderWidth: "2px" }} variant="outlined" startIcon={<AddIcon />}>
						Choose Pictures
					</Button>
				</Box>

				{children.length !== 0 &&
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{children.map((item) => (
							<Image path={item.path} title="Banner!" key={item.id} />
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
				<Box>
					<Button sx={arrowButton} onClick={() => onNext(index)} aria-label="next" >
						<ArrowDropDownRoundedIcon sx={{ fontSize: "2.7rem" }} />
					</Button>
				</Box>
			}
		</Box>
	);
};

const useStyles = makeStyles({
	// if possible, not try to change this class ;-;
	bannerComponent: {
		position: "relative",
		width: "100%",
		height: "auto",
		borderBottom: '1px solid #C4C4C4',
	},

	addPicture: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

const arrowButton = {
	width: "100%",
	padding: "4px 0",
	margin: "10px 0",
	color: '#C4C4C4',

	"&:hover": {
		backgroundColor: "#fafafa",
	},
}

export default BannerItem;
