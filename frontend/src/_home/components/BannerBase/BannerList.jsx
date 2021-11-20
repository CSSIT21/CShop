import { useState, useLayoutEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import BannerItem from './BannerItem';
import { noop } from '~/common/utils';
import { Container } from '@mui/material';

const BannerList = ({ items = [], setItems = noop }) => {

	let height = 0;
	const transitions = useTransition(
		items.map((data) => {
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
		<Container sx={{ width: "70%", margin: "50px auto", height, position: "relative" }}>
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
		</Container>
	);
};

export default BannerList;
