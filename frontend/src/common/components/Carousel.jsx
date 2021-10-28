import React from 'react';
import CarouselBase from './CarouselBase';

const Carousel = ({
	items = [],
	itemsPerRow = 1,
	rows = 1,
	gap = 10,
	loop = false,
	pageState = 0,
	hideArrow = true,
	setPageState = () => {
	},
	children,
	...rest
}) => {
	return (
			<CarouselBase
					cols={itemsPerRow}
					rows={rows}
					gap={gap}
					loop={loop}
					pageState={pageState}
					setPageState={setPageState}
					hideArrow={hideArrow}
					{...rest}
			>
				{items.map((item, idx) => (
						<CarouselBase.Item key={idx}>{children(item, idx)}</CarouselBase.Item>
				))}
			</CarouselBase>
	);
};

export default Carousel;
