const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i + 10}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i + 20}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i + 30}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Mobile-Gadgets-cat.11044951?page=${i}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Mobile-Gadgets-cat.11044951?page=${i + 10}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Mobile-Gadgets-cat.11044951?page=${i + 20}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Mobile-Gadgets-cat.11044951?page=${i + 30}`,
					{ category: 'electronics' }),
			),
		)).flat(),
	];
	
	return { searchResultComputer };
};

module.exports = array;