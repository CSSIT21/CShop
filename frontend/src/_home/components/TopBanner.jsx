import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Banner1 from '../../common/assets/images/Banner1.png';
import Carousel from '../../common/components/Carousel';
import CustomDot from '../../common/components/CarouselBase/CustomDot';
import LazyImage from '../../common/components/LazyImage/LazyImage';

const useStyles = makeStyles({
	bannerWrapper: {
		width: '100%',
		padding: '40px 0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F4F5F6',
	},
	
	carouselStyle: {
		width: '75%',
		marginBottom: 25,
	},
});

const Banner = () => {
	const bannerItems = [
		{
			id: 0,
			url: Banner1,
		},
		{
			id: 1,
			url: Banner1,
		},
		{
			id: 2,
			url: Banner1,
		},
	];
	
	const [items] = useState(bannerItems);
	console.log('banner', items);
	const [page, setPage] = useState(0);
	const classes = useStyles();
	
	return (
			<Box className={classes.bannerWrapper}>
				<Box className={classes.carouselStyle}>
					<Carousel
							items={items}
							pageState={page}
							setPageState={setPage}
							loop={true}
							itemsPerRow={1}
							hideArrow={false}
					>
						{(item) => (
								<LazyImage
										src={item.url}
										lazy="https://via.placeholder.com/1140x516.png"
										key={item.id}
								/>
						)}
					</Carousel>
				</Box>
				
				<CustomDot
						width={95}
						setPageState={setPage}
						currentPage={page}
						totalPage={3}
				/>
			</Box>
	);
};

export default Banner;
