import { useState, useLayoutEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import Box from '@mui/material/Box';
import BannerItem from './BannerItem';
import BannerPic from "../../assets/images/TopBanner.png";

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
				{
					id: 2,
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
			]
		},
	},
];

const BannerList = () => {
	const [items, setItems] = useState([]);

	useLayoutEffect(() => {
		console.log("test");
		setItems(bannerList.map(item => ({ ...item, height: 100 })));
	}, []);

	let height = 0;
	const transitions = useTransition(
		items.map((data, index) => {
			return { ...data, y: (height += data.height || 0) - data.height || 0 }
		}),
		d => d.id,
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
		<Box sx={{ width: "80%", margin: "50px auto", height, position: "relative" }}>
			{transitions.map(({ item, props: { y, ...rest }, key }, index) => (
				<animated.div
					key={key}
					style={{
						position: "absolute",
						willChange: "transform, height, opacity",
						width: "100%",
						zIndex: items.length - index,
						transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
						...rest
					}}>
					<BannerItem
						setItems={setItems}
						index={index}
						items={items}
						onNext={onNext}
						onPrev={onPrev}
					/>
				</animated.div>
			))}
		</Box>
	);
};

export default BannerList;
