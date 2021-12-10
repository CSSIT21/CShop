import { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { Container } from '@mui/material';
import BannerItem from './BannerItem';
import { noop } from '~/common/utils';

const BannerList = ({ items = [], setItems = noop }) => {
	let height = 0;
	const transitions = useTransition(items.map(item => (
		{ ...item, y: (height += item.height || 0) - item.height || 0 })),
		{
			key: item => item.id,
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height }) => ({ y, height, opacity: 1 }),
			update: ({ y, height }) => ({ y, height }),
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

	const onDelete = (key) => {
		setItems(items => {
			let clonedItems = [...items];
			console.log('CLONED!', clonedItems.filter(item => item.id !== key));
			return clonedItems.filter(item => item.id !== key);
		})
	};

	return (
		<Container sx={{ height, width: "70%", margin: "50px auto", position: "relative" }}>
			{transitions((style, item, t, index) => (
				<animated.div
					key={item.id}
					style={{
						position: "absolute",
						willChange: "transform, height, opacity",
						width: "100%",
						zIndex: items.length - index,
						...style
					}}
				>
					<BannerItem
						index={index}
						items={items}
						item={item}
						setItems={setItems}
						onNext={onNext}
						onPrev={onPrev}
						onDelete={() => onDelete(item.id)}
					/>
				</animated.div>
			))}
		</Container>
	);
};

export default BannerList;