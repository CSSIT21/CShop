import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import BannerItem from '../components/BannerBase/BannerItem';

const data = [
	{
		name: 'Rare Wind',
		description: '#a8edea → #fed6e3',
		css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
		height: 150
	},
	{
		name: 'Saint Petersburg',
		description: '#f5f7fa → #c3cfe2',
		css: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
		height: 150
	},
	{
		name: 'Deep Blue',
		description: '#e0c3fc → #8ec5fc',
		css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
		height: 200
	},
	{
		name: 'Ripe Malinka',
		description: '#f093fb → #f5576c',
		css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		height: 140
	},
	{
		name: 'Near Moon',
		description: '#5ee7df → #b490ca',
		css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
		height: 200
	},
	{
		name: 'Wild Apple',
		description: '#d299c2 → #fef9d7',
		css: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
		height: 150
	},
	{
		name: 'Ladoga Bottom',
		description: '#ebc0fd → #d9ded8',
		css: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
		height: 160
	},
	{
		name: 'Sunny Morning',
		description: '#f6d365 → #fda085',
		css: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
		height: 140
	},
	{
		name: 'Lemon Gate',
		description: '#96fbc4 → #f9f586',
		css: 'linear-gradient(to top, #96fbc4 0%, #f9f586 100%)',
		height: 200
	}
];

const ManageBanner = () => {
	const [items, setItems] = useState(data);

	let height = 0
	const transitions = useTransition(
		items.map(data => ({ ...data, y: (height += data.height) - data.height })),
		d => { console.log(d); return d.name },
		{
			from: { height: 0, opacity: 0 },
			leave: { height: 0, opacity: 0 },
			enter: ({ y, height }) => ({ y, height, opacity: 1 }),
			update: ({ y, height }) => ({ y, height })
		}
	)

	return (
		<>
			<BannerItem />
		</>
	);
};

export default ManageBanner;
