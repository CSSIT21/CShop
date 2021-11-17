import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { makeStyles } from "@mui/styles";
import BannerItem from '../components/BannerBase/BannerItem';
import Box from '@mui/material/Box';

const data = [
	{
		name: 'Rare Wind',
		description: '#a8edea → #fed6e3',
		height: 500
	},
	{
		name: 'Saint Petersburg',
		description: '#f5f7fa → #c3cfe2',
		height: 500
	},
	{
		name: 'Deep Blue',
		description: '#e0c3fc → #8ec5fc',
		height: 500
	},
	{
		name: 'Ripe Malinka',
		description: '#f093fb → #f5576c',
		height: 500
	},
	{
		name: 'Near Moon',
		description: '#5ee7df → #b490ca',
		height: 500
	},
	{
		name: 'Wild Apple',
		description: '#d299c2 → #fef9d7',
		height: 500
	},
	{
		name: 'Ladoga Bottom',
		description: '#ebc0fd → #d9ded8',
		height: 500
	},
	{
		name: 'Sunny Morning',
		description: '#f6d365 → #fda085',
		height: 500
	},
	{
		name: 'Lemon Gate',
		description: '#96fbc4 → #f9f586',
		height: 500
	}
];


const ManageBanner = () => {
	const classes = useStyles();
	const [items, setItems] = useState(data);

	let height = 0
	const transitions = useTransition(
		items.map(data => ({ ...data, y: (height += data.height) - data.height })),
		d => d.name,
		{
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height }) => ({ y, height, opacity: 1 }),
			update: ({ y, height }) => ({ y, height })
		}
	);

	const onPrev = (index) => {
		setItems((items) => {
			return items.map((item, i) => {
				if (i == index) {
					return items[i - 1];
				}
				else if (i == index - 1) {
					return items[i + 1];
				}
				return item;
			})
		})
	};

	const onNext = (index) => {
		setItems((items) => {
			return items.map((item, i) => {
				if (i == index) {
					return items[i + 1];
				}
				else if (i == index + 1) {
					return items[i - 1];
				}
				return item;
			})
		})
	};

	return (
		<Box style={{ height, position: "relative" }}>
			{transitions.map(({ item, props: { y, ...rest }, key }, index) => (
				<animated.div
					key={key}
					style={{
						position: "absolute",
						willChange: "transform, height, opacity",
						width: "100%", zIndex: items.length - index, transform: y.interpolate(y => `translate3d(0,${y}px,0)`), ...rest
					}}>
					<Box className={classes.bannerWrapper}>
						<BannerItem
							items={items}
							item={item}
							index={index}
							setItems={setItems}
							onNext={onNext}
							onPrev={onPrev}
						/>
					</Box>
				</animated.div>
			))}
		</Box>
	);
};

const useStyles = makeStyles({
	bannerWrapper: {
		position: "relative",
		backgroundSize: "cover",
		width: "100%",
		height: "100%",
		padding: "30px"
	}
});
export default ManageBanner;
