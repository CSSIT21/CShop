import { useRef, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { noop } from '~/common/utils';

const Image = styled(({ path, title, ...rest }) => (
	<img
		height="240"
		width="50%"
		src={path}
		alt={title}
		{...rest}
	/>
))(() => ({
	padding: "10px",
	borderRadius: 10,
	objectFit: "cover",
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
		return () => window.removeEventListener('resize', () => onSetItem());
	}, []);

	return (
		<Box className={classes.bannerComponent} ref={wrapper}>
			{index > 0 &&
				<Box>
					<Button sx={{ width: '100%' }} aria-label="prev" onClick={() => onPrev(index)}>
						<ArrowDropUpIcon />
					</Button>
				</Box>
			}

			<Stack direction="column" gap={5}>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<img
						height="480px"
						width="100%"
						src={head}
						alt={`Banner ${item.id}`}
					/>
				</Box>

				{children.length !== 0 &&
					<Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
						{children.map((item) => (
							<Image path={item.path} title="Banner!" key={item.id} />
						))}
					</Box>
				}
			</Stack>

			{index < items.length - 1 &&
				<Box>
					<Button sx={{ width: '100%' }} aria-label="next" onClick={() => onNext(index)}>
						<ArrowDropDownIcon />
					</Button>
				</Box>
			}
		</Box>
	);
};

const useStyles = makeStyles({
	bannerComponent: {
		position: "relative",
		width: "100%",
		height: "auto",
		borderBottom: '1px solid #C4C4C4'
	},
});

export default BannerItem;
