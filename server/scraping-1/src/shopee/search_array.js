const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		
		// * Fashion category
		
		// Men clothes
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Men-Clothes-cat.11044945?page=${i}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Men-Clothes-cat.11044945?page=${i + 10}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Men-Clothes-cat.11044945?page=${i + 20}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Men-Clothes-cat.11044945?page=${i + 30}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		
		// Women clothes
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Women-Clothes-cat.11044944?page=${i}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Women-Clothes-cat.11044944?page=${i + 10}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Women-Clothes-cat.11044944?page=${i + 20}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Women-Clothes-cat.11044944?page=${i + 30}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		
		// Bags
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Bags-cat.11044964?page=${i}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Bags-cat.11044964?page=${i + 10}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		
		// Men shoes
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Men-Shoes-cat.11044949?page=${i}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		
		// Women shoes
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Women-Shoes-cat.11044948?page=${i}`,
					{ category: 'fashion' }),
			),
		)).flat(),
		
		// * Kids category
		// Kids
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Baby-Toys-cat.11044960?page=${i}`,
					{ category: 'kids' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Baby-Toys-cat.11044960?page=${i + 10}`,
					{ category: 'kids' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Baby-Toys-cat.11044960?page=${i + 20}`,
					{ category: 'kids' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Baby-Toys-cat.11044960?page=${i + 30}`,
					{ category: 'kids' }),
			),
		)).flat(),
		
		// Gaming
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Gaming-Hobbies-cat.11044961?page=${i}`,
					{ category: 'kids' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Gaming-Hobbies-cat.11044961?page=${i + 10}`,
					{ category: 'kids' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Gaming-Hobbies-cat.11044961?page=${i + 20}`,
					{ category: 'kids' }),
			),
		)).flat(),
		
		// * Beauty category
		// Beauty
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Beauty-Personal-Care-cat.11044959?page=${i}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Beauty-Personal-Care-cat.11044959?page=${i + 10}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Beauty-Personal-Care-cat.11044959?page=${i + 20}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Beauty-Personal-Care-cat.11044959?page=${i + 30}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		
		// Fashion accessories
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Fashion-Accessories-cat.11044954?page=${i}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Fashion-Accessories-cat.11044954?page=${i + 10}`,
					{ category: 'beauty' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Fashion-Accessories-cat.11044954?page=${i + 20}`,
					{ category: 'beauty' }),
			),
		)).flat(),
	];
	
	return { searchResultComputer };
};

module.exports = array;