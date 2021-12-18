import { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import config from "~/common/constants"
import { useTransition, animated } from 'react-spring';
import { Container } from '@mui/material';
import BannerItem from './BannerItem';
import { noop } from '~/common/utils';

const BannerList = ({ items = [], setItems = noop, getData = noop, }) => {
	const [loading, setLoading] = useState(false);

	let height = 0;
	const transitions = useTransition(items.map(item => (
		{ ...item, y: (height += item.height || 0) - item.height || 0 })
	),
		{
			keys: item => item.id,
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height }) => ({ y, height, opacity: 1 }),
			update: ({ y, height }) => ({ y, height }),
		},
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

	const handleDeleteBanner = (id, index) => {
		setLoading(true);
		axios
			.delete(`${config.SERVER_URL}/home/banner/${id}`)
			.then(({ data }) => {
				if (data.success) {
					console.log(data.bannerInfo);

					// setItems(items => {
					// 	items.splice(index, 1)
					// 	return [...items];
					// });
					getData();
					setLoading(false);
					return Swal.fire('Done', "Already deleted the banner", 'success');
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				return Swal.fire('Oop!', 'Cannot delete banner, please try again', 'error');
			})
	};

	return (
		<Container sx={{ height, width: "70%", margin: "50px auto", position: "relative" }}>
			{transitions((style, item, t, index) => {
				return (
					<animated.div
						key={index}
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
							getData={getData}
							handleDeleteBanner={() => handleDeleteBanner(item.id, index)}
							mainLoading={loading}
						/>
					</animated.div>
				)
			})}
		</Container>
	);
};

export default BannerList;