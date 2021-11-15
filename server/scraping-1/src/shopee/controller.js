const { search } = require('./scraper_search');

const scrape = async (browser, query) => {
	const searchResult = [
		...await Promise.all(
			Array.from(
				Array(50),
				(_, i) => (search(browser, `https://shopee.co.th/Computers-Laptops-cat.11044958?page=${i}`)),
			),
		),
	];
	
	console.log(searchResult.length);
};

module.exports = { scrape };