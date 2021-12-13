const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		...await mapper(
			30,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Mobile-Gadgets-cat.11013350?filters=4%2C5&page=${i}`,
					{ category: 'mobile' },
				),
		),
		...await mapper(
			30,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Computers-Peripherals-cat.11013247?filters=5&page=${i}`,
					{ category: 'computer' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Stationery-Supplies-cat.11000001.11011392?filters=5&page=${i}`,
					{ category: 'stationary' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Books-cat.11011760.11027338?filters=5&page=${i}`,
					{ category: 'book' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Women's-Apparel-cat.11012819?filters=5&page=${i}`,
					{ category: 'fashion' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Men's-wear-cat.11012963?filters=5&page=${i}`,
					{ category: 'fashion' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Toys-Kids-Babies-cat.11011538?filters=5&page=${i}`,
					{ category: 'kids' },
				),
		),
		...await mapper(
			20,
			5,
			(_, i) =>
				search(
					browser,
					`https://shopee.sg/Kids-Fashion-cat.11012218?filters=5&page=${i}`,
					{ category: 'kids' },
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