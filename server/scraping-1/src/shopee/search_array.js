const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		...await mapper(
			40,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Beauty-Personal-Care-cat.11012301?filters=5&page=${i}`,
					{ category: 'beauty' },
				),
		),
		...await mapper(
			10,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Furniture-cat.11000001.11001566?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			3,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Bathroom-cat.11000001.11011195?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			3,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Beddings-cat.11000001.11011220?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			10,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Home-Decor-cat.11000001.11011273?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			5,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Home-Organisation-cat.11000001.11011297?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			5,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Kitchen-Dining-cat.11000001.11011332?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			5,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Lighting-cat.11000001.11011364?filters=5&page=${i}`,
					{ category: 'furniture' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Home-Appliances-cat.11027421?filters=5&page=${i}`,
					{ category: 'electronics' },
				),
		),
		...await mapper(
			5,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Cameras-Drones-cat.11013548?filters=5&page=${i}`,
					{ category: 'electronics' },
				),
		),
		...await mapper(
			15,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Food-Beverages-cat.11011871?filters=5&page=${i}`,
					{ category: 'food' },
				),
		),
		...await mapper(
			5,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Health-Wellness-cat.11027491?filters=5&page=${i}`,
					{ category: 'food' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Sports-Outdoors-cat.11012018?filters=5&page=${i}`,
					{ category: 'sports' },
				),
		),
		...await mapper(
			6,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Women's-Bags-cat.11012592?filters=5&page=${i}`,
					{ category: 'accessories' },
				),
		),
		...await mapper(
			6,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Men's-Bags-cat.11012659?filters=5&page=${i}`,
					{ category: 'accessories' },
				),
		),
		...await mapper(
			9,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Jewellery-Accessories-cat.11013077?filters=5&page=${i}`,
					{ category: 'accessories' },
				),
		),
		...await mapper(
			6,
			3,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Watches-cat.11012515?filters=5&page=${i}`,
					{ category: 'accessories' },
				),
		),
	];
	
	return { searchResultComputer };
};

const mapper = async (page, size, mapfn) => {
	const results = [];
	
	for (const p of Array(page / size).keys()) {
		results.concat(
			(await Promise.all(
				Array.from(
					Array(10),
					mapfn,
				),
			)).flat(),
		);
	}
	
	return results;
};

module.exports = array;