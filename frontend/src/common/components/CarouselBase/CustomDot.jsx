import React from 'react';

const CustomDot = ({
	currentPage = 0,
	totalPage = 1,
	duration = '.25s',
	ease = 'ease-in-out',
	width = '100%',
	height = '7px',
	background = '#D9DBE9',
	activeBackground = '#FD6637',
	setPageState,
	...rest
}) => {
	const wrapper = {
		width,
		height,
		background,
		margin: '0px auto',
		borderRadius: '15px',
		position: 'relative',
		cursor: 'pointer',
	};
	
	const active = {
		width: Math.ceil(100 / totalPage) + '%',
		height,
		background: activeBackground,
		borderRadius: '15px',
		position: 'absolute',
		left: (100 * currentPage) / totalPage + '%',
		transition: `all ${duration} ${ease}`,
		boxShadow: '0px 1px 10px rgba(255, 143, 107, 0.8)',
	};
	
	const setPageHandler = (idx) => {
		setPageState(idx);
	};
	
	return (
			<div style={wrapper}>
				<div style={active}></div>
				{[...Array(totalPage)].map((item, idx) => {
					const stepper = {
						width: Math.ceil(100 / totalPage) + '%',
						height,
						borderRadius: '15px',
						position: 'absolute',
						left: (100 * idx) / totalPage + '%',
					};
					return (
							<div
									style={stepper}
									onClick={() => setPageHandler(idx)}
									key={idx}
							></div>
					);
				})}
			</div>
	);
};

export default CustomDot;
