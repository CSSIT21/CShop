const { search } = require('./search_scraper');

const array = async (browser) => {
	const searchResultComputer = [
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+10}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+20}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+30}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+10}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+20}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(10),
				(_, i) => search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i+30}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(30),
				(_, i) => search(browser, `https://shopee.co.th/Mobile-Gadgets-cat.11044951?page=${i}`),
			),
		)),
		...(await Promise.all(
			Array.from(
				Array(5),
				(_, i) => search(browser, `https://shopee.co.th/shop/287137993/search?page=${i}&sortBy=pop`),
			),
		)),
		await search(browser, `https://shopee.co.th/shop/151635150/search`),
	];
	
	searchResultComputer.flat();
	
	return { searchResultComputer };
};

module.exports = array;