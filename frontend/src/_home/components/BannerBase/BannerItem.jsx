import { useRef, useLayoutEffect } from 'react';
import { makeStyles } from "@mui/styles";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { noop } from '~/common/utils';

const BannerItem = ({
	index = 0,
	items = [],
	setItems = noop,
	item = null,
	onNext = noop,
	onPrev = noop
}) => {
	const wrapper = useRef(null);
	const classes = useStyles();

	useLayoutEffect(() => {
		setItems(items => {
			items[index].height = wrapper.current.offsetHeight;
			return [...items];
		})
	}, [index]);

	return (
		<Box className={classes.bannerComponent} ref={wrapper}>
			<Stack direction="column" gap={10}>
				{index > 0 && <Box><Button sx={{ width: '100%' }} aria-label="prev" onClick={() => onPrev(index)}>
					<ArrowDropUpIcon />
				</Button></Box>}

				<Box>{item.name} {item.name.split('').map((k, key) => <br key={key} />)}</Box>

				{index < items.length - 1 && <Box><Button sx={{ width: '100%' }} aria-label="next" onClick={() => onNext(index)}>
					<ArrowDropDownIcon />
				</Button></Box>}
			</Stack>
		</Box>
	);
};

const useStyles = makeStyles({
	bannerComponent: {
		width: "100%",
		height: "auto",
		backgroundImage: "linear-gradient(135deg, rgb(168, 237, 234) 0%, rgb(254, 214, 227) 100%)",
		borderBottom: '2px solid #5353534c'
	},
});

export default BannerItem;
