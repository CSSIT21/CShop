const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		
		// * Electronics category
		
		// Computer & Laptop
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
		
		// Mobile & Gadget
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
		
		// Home Appliances
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Home-Appliances-cat.11044955?page=${i}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Home-Appliances-cat.11044955?page=${i + 10}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Home-Appliances-cat.11044955?page=${i + 20}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Home-Appliances-cat.11044955?page=${i + 30}`,
					{ category: 'electronics' }),
			),
		)).flat(),
		
		// * Education category
		// Stationary
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i}`,
					{ category: 'education' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i + 10}`,
					{ category: 'education' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i + 20}`,
					{ category: 'education' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i + 30}`,
					{ category: 'education' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i + 40}`,
					{ category: 'education' }),
			),
		)).flat(),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(
					browser,
					`https://shopee.co.th/Stationery-Books-Music-cat.11044957?officialMall=true&page=${i + 50}`,
					{ category: 'education' }),
			),
		)).flat(),
	];
	
	return { searchResultComputer };
};

module.exports = array;